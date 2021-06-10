export default class Query {
  constructor() {
    this.reloadComponent = this.reloadComponent.bind(this);
    this.addElement = this.addElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.edditElement = this.edditElement.bind(this);
  };

  addClass(items, className) {
    document.querySelectorAll(items).forEach(item => item.classList.add(className));
  };

  removeClass(items, className) {
    document.querySelectorAll(items).forEach(item => item.classList.remove(className));
  };

  hide(items) {
    if (typeof items == "string") document.querySelectorAll(items).forEach(item => item.style.display = "none");
    else items.style.display = "none";
  };

  show(items) {
    if (typeof items == "string") document.querySelectorAll(items).forEach(item => item.style.display = "block");
    else items.style.display = "block";
  };

  redirect(to = "/") {
    return window.location.href = to;
  };

  reloadComponent(set) {
    set(st => st.map(s => s));
  };

  search(find, set) {
    set(st => st.filter(s => s.name.toLowerCase().indexOf(find.toLowerCase()) != -1));
  };

  addElement(adding, set) {
    set(st => [ ...st, adding ]);
    this.reloadComponent(set);
  };

  removeElement(removing, set) {
    set(st => st.filter(s => s.name != removing.name));
    this.reloadComponent(set);
  };

  edditElement(eddit, current, object, set) {
    object.forEach(bj => {
      if (bj.name == current.name) {
        object[object.indexOf(bj)] = eddit;
      };
    });
    this.reloadComponent(set);
  };

  enterValue(value, enter) {
    document.querySelector(enter).value = value;
  };

  toTop() {
    window.scrollBy(0, -1020010103012);
  };

  dynamicPath(id, url = "profile") {
    this.redirect(`/${url}/${id}`);
  };

  loadPhoto(photo, src, type = "") {
    if (
      /\.png$/.test(photo.name) ||
      /\.jpg$/.test(photo.name) ||
      /\.svg$/.test(photo.name) ||
      /\.jpeg$/.test(photo.name)
    ) {
      const reader = new FileReader();
      if (type != "convert") src.removeAttribute("src");
      reader.readAsDataURL(photo);
      reader.onload = e => {
        if (type == "convert") return src(e.target.result);
        src.setAttribute("src", e.target.result);
      };
    } else return photo;
  };

  getCurrentDate() {
    const date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  getHoursAndMinutes() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
};
