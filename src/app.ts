import "../style/style.css";
import { InputDialog } from "./components/dialog/dialog";
import { VideoComponent } from "./components/page/item/video";
import { TodoComponent } from "./components/page/item/todo";
import { NoteComponent } from "./components/page/item/note";
import { ImageComponent } from "./components/page/item/image";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page";
import { Component } from "./components/component";

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
      "https://youtu.be/K3-jG52XwuQ"
    );
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const root = document.querySelector("#root")! as HTMLElement;

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(root);
      });

      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가 해준다
        dialog.removeFrom(root);
      });

      dialog.attachTo(root, "beforeend");
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement);
