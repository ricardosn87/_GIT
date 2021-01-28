import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  /*  private url = 'http://localhost:4444'
 
   private socket = io(this.url) */

  private subjMessage: Subject<Message> = new Subject<Message>();

  constructor(private socket: Socket) {

  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }
}
