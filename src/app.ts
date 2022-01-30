import "../style/style.css";
import { Component } from "./components/component";
import { ImageComponent } from "./components/page/item/image";
import { VideoComponent } from "./components/page/item/video";
import { NoteComponent } from "./components/page/item/note";
import { TodoComponent } from "./components/page/item/todo";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      "Video Title",
      "https://youtu.be/5qap5aO4i9A"
    );
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
