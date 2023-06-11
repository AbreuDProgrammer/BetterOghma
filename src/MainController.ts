import LocalStorage from './LocalStorage';

type CallbackFunction = (element: Element) => void;

export default class MainController
{
  protected readonly AVARAGE_DECIMAL_PARTS = 2;

  protected storage: LocalStorage
  protected url: string
  protected page: string

  constructor(url: string, page: string)
  {
    this.url = url;
    this.page = page;
    this.storage = new LocalStorage();

    this.getByText("Inscrições nos Exames", this.hide);
    this.getByClass("events announcements", this.hide);
    this.getByText("Importante!", this.hide);
    this.getByClass("nav pull-right", (element: HTMLElement) => {
      element.style.display = "flex";
      element.style.alignItems = "center";
    });
    
    this.getByClass("nav pull-right", (element: HTMLElement) => {
      var li = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      if(this.storage.check("DECREASE", "true"))
        checkbox.checked = true;

      checkbox.onclick = () => {
        this.storage.set('DECREASE', this.storage.check("DECREASE", "true")?"false":"true");
        location.reload();
      }

      var text = document.createElement("span");
      text.textContent = "Ordem decrescente";
      text.style.padding = "1rem";
    
      li.style.display = "flex";
      li.appendChild(text);
      li.appendChild(checkbox);
      li.style.order = "-1";
      element.appendChild(li);
    });
  }

  async index()
  {

  }

  protected hide = function(element: HTMLElement): void
  {
    element.style.display = "none";
  }

  protected grid = function(element: HTMLElement): void
  {
    element.style.display = "grid";
  }

  protected flex = function(element: HTMLElement): void
  {
    element.style.display = "flex";
  }

  protected async get(pattern: string, callback: CallbackFunction)
  {
    let element = document.querySelector(pattern);

    if(!element)
      return;

    callback(element);
  }

  protected async getAll(pattern: string, callback: CallbackFunction)
  {
    let element = document.querySelectorAll(pattern);
  
    if(!element)
      return;
  
    for(var i = 0; i < element.length; i++)
      callback(element[i]);
  }

  protected async getByClass(className: string, callback: CallbackFunction)
  {
    let element = document.getElementsByClassName(className);

    if(!element)
      return;

    for(var i = 0; i < element.length; i++)
      callback(element[i]);
  }

  protected async getByText(text: string, callback: CallbackFunction)
  {
    var elements = document.getElementsByTagName("*");

    for (var i = 0; i < elements.length; i++)
      if (elements[i].textContent === text)
        callback(elements[i]);
  }
}