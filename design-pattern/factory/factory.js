class Dog {
  bark() {
    console.log('dog can bark')
  }
}

class Cat {
  meow() {
    console.log('cat can meow')
  }
}

class Fish {
  swim() {
    console.log('fish can swimming')
  }
}

/**
 * abstract factory design pattern can generate different instance depends on a given parameter 
 */
function animalFactory (type) {
  switch(type) {
    case 'dog':
      return new Dog()
    case 'cat':
      return new Cat()
    case 'fish':
      return new Fish()
  }
}

const cat = animalFactory('cat')
// console.log('cat', cat.meow())