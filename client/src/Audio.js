import axios from 'axios';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class AudioService extends AudioContext {
	constructor() {
		super();
		this.audio_buffer = null;
		this.audio_src = null;
		this.source = null;
		this.is_playing = false;
		this.duration = null;
		this.current_time = 0;
		this.interval_ref = null;
	};

	loadSrc = async url => {
		try {
			if (url !== this.audio_src) {
				this.clearCurrentTime();
			}

			const response = await axios.get(url, { responseType: 'arraybuffer' });
			this.audio_src = url;

			return new Promise((resolve, reject) => {
				this.decodeAudioData(response.data, decoded_buffer => {
					this.audio_buffer = decoded_buffer;
					this.duration = Math.ceil(decoded_buffer.duration);

					return resolve();
				}, err => {
					console.error(err);
					reject(err);
				});
			});
		} catch (error) {
			console.error(error);
		}
	};

	ontimeupdate = () => {
		// should ovverride this method in instance;
	};

	onended = () => {
		// should ovverride this method in instance;
	};

	updateCurrentTime = () => {
		const i = 1000;

		this.interval_ref = setInterval(() => {
			this.current_time += i / 1000;

			if (this.current_time >= this.duration) {
				this.stopAudio();
				this.onended();
			} else {
				this.ontimeupdate();
			}
		}, i);
	};

	playAudio = () => {
		this.source = this.createBufferSource();

		this.source.buffer = this.audio_buffer;
		this.source.connect(this.destination);
		this.is_playing = true;

		this.updateCurrentTime();

		if (this.current_time) {
			this.source.start(0, this.current_time);
		} else {
			this.source.start(0);
		}
	};

	stopAudio = () => {
		this.source.stop(0);
		this.is_playing = false;

		clearInterval(this.interval_ref);
	};

	clearCurrentTime = () => {
		this.current_time = 0;

		clearInterval(this.interval_ref);
	};
};