import "../style/style.css";
import { Component } from "./components/component";
import { VideoComponent } from "./components/page/item/video";
import { TodoComponent } from "./components/page/item/todo";
import { NoteComponent } from "./components/page/item/note";
import { ImageComponent } from "./components/page/item/image";
import { Composable } from "./components/page/page";
import { PageComponent } from "./components/page/page";
import { PageItemComponent } from "./components/page/page";
import { InputDialog } from "./components/dialog/dialog";
import { MediaSectionInput } from "./components/dialog/input/media-input";
import { TextSectionInput } from "./components/dialog/input/text-input";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const inputSection = new InputComponent();

      dialog.addChild(inputSection);
      dialog.attachTo(this.dialogRoot, "beforeend");

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const section = makeSection(inputSection);
        this.page.addChild(section);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(
  document.querySelector(".document")! as HTMLElement,
  document.querySelector("#root")! as HTMLElement
);
