import axios from 'axios';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class AudioService extends AudioContext {
	constructor() {
		super();
		this.audio_buffer = null;
		this.audio_src = null;
		this.source = null;
		this.pausedAt = null;
		this.startedAt = null;
	};

	loadSrc = async url => {
		try {
			const response = await axios.get(url, { responseType: 'arraybuffer' });
			this.audio_src = url;

			this.decodeAudioData(response.data, decoded_buffer => {
				this.audio_buffer = decoded_buffer;
				this.playAudio();
			}, err => {
				console.error(err);
			});
		} catch (error) {
			console.error(error);
		}
	};

	playAudio = () => {
		this.source = this.createBufferSource();

		this.source.buffer = this.audio_buffer;
		this.source.connect(this.destination);

		if (this.pausedAt) {
			this.startedAt = Date.now() - this.pausedAt;
			this.source.start(0, this.pausedAt / 1000);
		} else {
			this.startedAt = Date.now();
			this.source.start(0);
		}
	};

	stopAudio = () => {
		this.source.stop(0);
		this.pausedAt = Date.now() - this.startedAt;
	};

	clearPausedAndStartedTime = () => {
		this.pausedAt = null;
		this.startedAt = null;
	};
};