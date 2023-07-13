import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent {

 @Input() chats!: {
  name: string;
  date: string;
  lastmsg: string;
}[]

}
