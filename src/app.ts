import "../style/style.css";
import { PageComponent } from "./components/page/page";
import { ImageComponent } from "./components/page/item/image";

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    image.attachTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);