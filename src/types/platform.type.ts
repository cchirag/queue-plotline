import { Train } from "./train.type";




export type Platform = {
    number: number;
    train?: Train | null;
};