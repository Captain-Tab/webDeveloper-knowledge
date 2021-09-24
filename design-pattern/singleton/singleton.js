/**
 * singleton pattern
 */

class Dog {
    bark () {
        console.log('I can bark')
    }

    // 单例模式
     static get singleInstance () {
        if (!Dog.instance) {
            Dog.instance = new Dog()
        }
        return Dog.instance
    }

}

export default Dog
