import { AngularFireUploadTask } from "@angular/fire/storage";
import { Observable } from "rxjs";

export interface FileEntry {
    file: File | null
    task: AngularFireUploadTask | null 
    percentage: string | null
    uploading: boolean | null
    finished: boolean | null
    paused: boolean | null
    error: boolean | null
    canceled: boolean | null
    bytesuploaded: number | null
    state: string | null
}