import { Howl, Howler } from 'howler';
import { useAppStore } from '../../store/useAppStore';

class AudioEngine {
  private sounds: Record<string, Howl> = {};
  
  public init() {
    // In a real scenario, we'd load actual audio files.
    // We'll create silent stubs so the game doesn't crash if files are missing.
    this.sounds = {
      hover: new Howl({ src: ['/assets/audio/hover.mp3'], volume: 0.5 }),
      click: new Howl({ src: ['/assets/audio/click.mp3'], volume: 0.8 }),
      death: new Howl({ src: ['/assets/audio/death.mp3'], volume: 1.0 }),
      music: new Howl({ src: ['/assets/audio/music.mp3'], loop: true, volume: 0.3 }),
    };

    // React to settings changes
    useAppStore.subscribe((state) => {
      Howler.volume(state.settings.masterVolume / 100);
    });
  }

  public play(name: keyof typeof this.sounds) {
    if (this.sounds[name]) {
      this.sounds[name].play();
    }
  }

  public stop(name: keyof typeof this.sounds) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }
}

export const Audio = new AudioEngine();
