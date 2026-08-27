(() => {
    "use strict";

    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
        console.warn("Web Audio API is not supported.");
        return;
    }

    let ctx = null;
    let master = null;
    let musicBus = null;
    let compressor = null;
    let timer = null;

    let isPlaying = false;
    let nextStepTime = 0;
    let step = 0;

    /*
     * 120 BPM
     * 1 step = 1/8 note = 0.25 sec
     * 128 steps = 32 seconds
     */
    const BPM = 120;
    const STEP_TIME = 60 / BPM / 2;
    const LOOP_STEPS = 128;

    const noteFreq = {
        C2: 65.41,
        D2: 73.42,
        E2: 82.41,
        F2: 87.31,
        G2: 98.00,
        A2: 110.00,

        C3: 130.81,
        D3: 146.83,
        E3: 164.81,
        F3: 174.61,
        G3: 196.00,
        A3: 220.00,
        B3: 246.94,

        C4: 261.63,
        D4: 293.66,
        E4: 329.63,
        F4: 349.23,
        G4: 392.00,
        A4: 440.00,
        B4: 493.88,

        C5: 523.25,
        D5: 587.33,
        E5: 659.25,
        G5: 783.99,
        A5: 880.00
    };

    /*
     * 8 bars:
     *
     * Cmaj7 | G | Am7 | Fmaj7
     * Cmaj7 | G | Fmaj7 | G
     */
    const chords = [
        ["C4", "E4", "G4", "B4"],
        ["G3", "B3", "D4", "G4"],
        ["A3", "C4", "E4", "G4"],
        ["F3", "A3", "C4", "E4"],

        ["C4", "E4", "G4", "B4"],
        ["G3", "B3", "D4", "G4"],
        ["F3", "A3", "C4", "E4"],
        ["G3", "B3", "D4", "G4"]
    ];

    const bassRoots = [
        "C2", "G2", "A2", "F2",
        "C2", "G2", "F2", "G2"
    ];

    /*
     * Melody intentionally sparse.
     * null = silence
     */
    const melodies = [
        ["E5", null, "G5", null, "A5", "G5", "E5", null],
        ["D5", null, "G5", "D5", null, "B4", "D5", null],
        ["E5", null, "A5", null, "G5", "E5", "C5", null],
        ["C5", null, "E5", "G5", null, "E5", "C5", null],

        ["G5", null, "E5", null, "D5", "E5", "G5", null],
        ["D5", null, "G5", null, "B4", "D5", "G5", null],
        ["A5", null, "G5", "E5", null, "C5", "E5", null],
        ["D5", "E5", "G5", null, "D5", null, "G5", null]
    ];

    function createAudioEngine() {
        ctx = new AudioContext();

        master = ctx.createGain();
        master.gain.value = 0.42;

        musicBus = ctx.createGain();
        musicBus.gain.value = 1;

        compressor = ctx.createDynamicsCompressor();

        compressor.threshold.value = -16;
        compressor.knee.value = 12;
        compressor.ratio.value = 5;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.25;

        musicBus.connect(compressor);
        compressor.connect(master);
        master.connect(ctx.destination);
    }

    // ---------------------------------------------------------
    // CHORD
    // ---------------------------------------------------------

    function playChord(notes, time) {
        notes.forEach((note, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = index % 2 === 0 ? "triangle" : "sine";

            osc.frequency.setValueAtTime(
                noteFreq[note],
                time
            );

            /*
             * Tiny detuning makes the chord wider and less sterile.
             */
            osc.detune.value = (index - 1.5) * 4;

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(1600, time);
            filter.Q.value = 0.5;

            gain.gain.setValueAtTime(0.0001, time);
            gain.gain.exponentialRampToValueAtTime(
                0.055,
                time + 0.08
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                time + 1.85
            );

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(musicBus);

            osc.start(time);
            osc.stop(time + 1.9);
        });
    }

    // ---------------------------------------------------------
    // BASS
    // ---------------------------------------------------------

    function playBass(note, time, duration = 0.35) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(noteFreq[note], time);

        filter.type = "lowpass";
        filter.frequency.value = 450;

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(
            0.13,
            time + 0.015
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            time + duration
        );

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(musicBus);

        osc.start(time);
        osc.stop(time + duration + 0.05);
    }

    // ---------------------------------------------------------
    // SUMMER PLUCK
    // ---------------------------------------------------------

    function playPluck(note, time) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";

        osc.frequency.setValueAtTime(
            noteFreq[note],
            time
        );

        /*
         * Quick pitch movement gives a playful pluck character.
         */
        osc.detune.setValueAtTime(10, time);
        osc.detune.exponentialRampToValueAtTime(
            0.1,
            time + 0.08
        );

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(4200, time);
        filter.frequency.exponentialRampToValueAtTime(
            900,
            time + 0.28
        );

        gain.gain.setValueAtTime(0.0001, time);

        gain.gain.exponentialRampToValueAtTime(
            0.115,
            time + 0.008
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            time + 0.32
        );

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(musicBus);

        osc.start(time);
        osc.stop(time + 0.35);
    }

    // ---------------------------------------------------------
    // KICK
    // ---------------------------------------------------------

    function playKick(time) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";

        osc.frequency.setValueAtTime(145, time);
        osc.frequency.exponentialRampToValueAtTime(
            48,
            time + 0.12
        );

        gain.gain.setValueAtTime(0.65, time);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            time + 0.28
        );

        osc.connect(gain);
        gain.connect(musicBus);

        osc.start(time);
        osc.stop(time + 0.3);
    }

    // ---------------------------------------------------------
    // NOISE
    // ---------------------------------------------------------

    function createNoiseBuffer(duration = 0.2) {
        const length = Math.floor(
            ctx.sampleRate * duration
        );

        const buffer = ctx.createBuffer(
            1,
            length,
            ctx.sampleRate
        );

        const data = buffer.getChannelData(0);

        for (let i = 0; i < length; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        return buffer;
    }

    // ---------------------------------------------------------
    // HI-HAT
    // ---------------------------------------------------------

    function playHat(time, volume = 0.045) {
        const source = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        source.buffer = createNoiseBuffer(0.06);

        filter.type = "highpass";
        filter.frequency.value = 6500;

        gain.gain.setValueAtTime(volume, time);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            time + 0.055
        );

        source.connect(filter);
        filter.connect(gain);
        gain.connect(musicBus);

        source.start(time);
    }

    // ---------------------------------------------------------
    // CLAP
    // ---------------------------------------------------------

    function playClap(time) {
        /*
         * Multiple short noise bursts = synthetic hand clap.
         */
        [0, 0.018, 0.038].forEach(offset => {
            const source = ctx.createBufferSource();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            source.buffer = createNoiseBuffer(0.12);

            filter.type = "bandpass";
            filter.frequency.value = 1500;
            filter.Q.value = 0.7;

            const start = time + offset;

            gain.gain.setValueAtTime(0.13, start);

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                start + 0.1
            );

            source.connect(filter);
            filter.connect(gain);
            gain.connect(musicBus);

            source.start(start);
        });
    }

    // ---------------------------------------------------------
    // MUSIC SEQUENCER
    // ---------------------------------------------------------

    function scheduleStep(currentStep, time) {
        /*
         * 16 eighth-note steps per bar.
         */
        const bar = Math.floor(currentStep / 16);
        const position = currentStep % 16;

        // Chords on beat 1 and beat 3

        if (position === 0 || position === 8) {
            playChord(chords[bar], time);
        }

        /*
         * Four-on-the-floor style kick.
         *
         * 1 . . . 2 . . . 3 . . . 4 . . .
         */
        if (
            position === 0 ||
            position === 4 ||
            position === 8 ||
            position === 12
        ) {
            playKick(time);
        }

        /*
         * Clap on beats 2 and 4.
         */
        if (
            position === 4 ||
            position === 12
        ) {
            playClap(time);
        }

        /*
         * Hi-hat on every eighth note.
         * Slight accent on off-beats.
         */
        playHat(
            time,
            position % 2
                ? 0.055
                : 0.032
        );

        /*
         * Bass groove.
         */
        if (
            position === 0 ||
            position === 6 ||
            position === 8 ||
            position === 14
        ) {
            playBass(
                bassRoots[bar],
                time,
                position === 0 ? 0.42 : 0.25
            );
        }

        /*
         * Melody uses 8 positions per bar.
         * Every melody note spans two sequencer steps.
         */
        if (position % 2 === 0) {
            const melodyIndex = position / 2;
            const note = melodies[bar][melodyIndex];

            if (note) {
                playPluck(note, time);
            }
        }
    }

    function scheduler() {
        /*
         * Schedule slightly ahead to avoid browser timer jitter.
         */
        while (
            nextStepTime < ctx.currentTime + 0.12
        ) {
            scheduleStep(step, nextStepTime);

            nextStepTime += STEP_TIME;

            step++;

            /*
             * LOOP
             *
             * 128 * 0.25 sec = 32 seconds
             */
            if (step >= LOOP_STEPS) {
                step = 0;
            }
        }
    }

    // ---------------------------------------------------------
    // PUBLIC CONTROLS
    // ---------------------------------------------------------

    async function start() {
        if (!ctx) {
            createAudioEngine();
        }

        if (ctx.state === "suspended") {
            await ctx.resume();
        }

        if (isPlaying) {
            return;
        }

        isPlaying = true;
        step = 0;

        nextStepTime = ctx.currentTime + 0.08;

        scheduler();

        timer = setInterval(
            scheduler,
            25
        );
    }

    function stop() {
        if (!isPlaying) return;

        isPlaying = false;

        clearInterval(timer);
        timer = null;

        /*
         * Fade out instead of suddenly cutting the music.
         */
        const now = ctx.currentTime;

        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(
            master.gain.value,
            now
        );

        master.gain.linearRampToValueAtTime(
            0,
            now + 0.35
        );

        setTimeout(() => {
            if (ctx) {
                ctx.close();
            }

            ctx = null;
            master = null;
            musicBus = null;
            compressor = null;
        }, 400);
    }

    function setVolume(value) {
        if (!master || !ctx) return;

        const volume = Math.max(
            0,
            Math.min(1, value)
        );

        master.gain.setTargetAtTime(
            volume,
            ctx.currentTime,
            0.05
        );
    }

    window.SummerMusic = {
        start,
        stop,
        setVolume,

        get isPlaying() {
            return isPlaying;
        }
    };
})();