import {Photo} from './photo';

export interface User {
    id: number;
    username: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    photoUrl: string;
    intoroduction?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo[];
}
