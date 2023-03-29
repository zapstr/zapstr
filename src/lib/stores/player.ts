import { writable } from 'svelte/store';
import type { Track } from '$lib/interfaces/tracks';

export class Player {
	public track: Track | undefined;
}

export const player = writable(new Player());
