class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    return `${this.name} the ${this.breed} barks!`;
  }
}

function createPerson() {
  const dog = new Dog("Rex", "Labrador");
  const div = document.createElement("div");
  div.textContent = dog.speak();
  document.getElementById("personInfo").appendChild(div);
}