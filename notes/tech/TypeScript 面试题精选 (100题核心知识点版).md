作为一个人工智能语言模型，我无法直接向你发送一个可下载的 PDF 文件。

不过，为了帮助你备战面试，我为你整理了一份**精选的 TypeScript 面试题集（涵盖基础到高级）**。你可以将以下内容复制到 Word、Markdown 或 Notion 中，然后导出为 PDF 进行阅读。

这份题集涵盖了从基础概念、类型系统到高级泛型和工具类型的核心知识点。

---

# TypeScript 面试题精选 (100题核心知识点版)

## 第一部分：TypeScript 基础 (Basics)

**1. 什么是 TypeScript？它与 JavaScript 有什么区别？**

* **答案：** TypeScript 是 JavaScript 的超集，由微软开发。它在 JavaScript 的基础上添加了静态类型系统（Static Typing）和基于类的面向对象编程特性。
* **区别：**
  * TS 需要编译（Transpile）成 JS 才能在浏览器运行。
  * TS 提供了静态类型检查，可以在编译阶段发现错误。
  * TS 支持接口（Interfaces）、泛型（Generics）等高级特性。

**2. 为什么要使用 TypeScript？（优缺点）**

* **优点：** 增强代码可读性和可维护性、强大的 IDE 支持（智能提示）、编译期错误检查、利于大型项目重构。
* **缺点：** 增加学习成本、初期开发速度稍慢（需要写类型）、编译时间。

**3. TypeScript 中的基本类型有哪些？**

* `boolean`, `number`, `string`, `array`, `tuple`, `enum`, `any`, `void`, `null`, `undefined`, `never`, `object`。

**4. `any` 和 `unknown` 的区别是什么？（高频）**

* **答案：**
  * `any`：绕过类型检查。任何类型都能赋值给 `any`，`any` 也能赋值给任何类型。使用它相当于放弃了 TS 的保护。
  * `unknown`：类型安全的 `any`。任何类型都能赋值给 `unknown`，但 `unknown` 不能直接赋值给其他类型（除了 `any` 和 `unknown`），也不能调用其方法，除非先进行类型断言或类型收窄（Type Narrowing）。

**5. `void` 和 `undefined` 的区别？**

* `void` 通常用于表示函数没有返回值。
* `undefined` 是一个具体的值（也是一种类型），表示变量已声明但未赋值。

**6. 什么是 `never` 类型？何时使用？**

* **答案：** `never` 表示永远不会存在的值的类型。
* **场景：**
  * 抛出异常的函数（也就是函数无法执行结束）。
  * 无限循环的函数。
  * 在 Switch 语句中进行“全面性检查”（Exhaustiveness Check），确保所有 Union 类型都被处理。

**7. TypeScript 中 `enum`（枚举）的使用场景？**

* 用于定义一组命名常量。分为数字枚举（默认从0自增）和字符串枚举。

    ```typescript
    enum Direction { Up, Down, Left, Right }
    ```

**8. 元组（Tuple）和数组（Array）有什么区别？**

* 数组通常用于存储相同类型的元素集合（`number[]`）。
* 元组用于存储固定数量和固定类型（可以是不同类型）的元素集合（`[string, number]`）。

**9. 什么是类型断言（Type Assertion）？**

* 当你比编译器更了解某个值的类型时，可以使用断言。
* 语法：`<Type>value` 或 `value as Type`（推荐后者，因为兼容 JSX）。

**10. 什么是联合类型（Union Types）？**

* 表示取值可以为多种类型中的一种。
* 语法：`let myVar: string | number;`

---

## 第二部分：接口与类型 (Interfaces & Types)

**11. `interface` 和 `type` 的区别是什么？（超高频）**

* **答案：**
  * **相同点：** 都可以描述对象或函数、都支持扩展（extends/intersection）。
  * **不同点：**
    * `interface` 可以声明合并（Declaration Merging），即同名接口会自动合并；`type` 不行。
    * `type` 可以声明基本类型别名、联合类型、元组等；`interface` 主要用于定义对象结构。
    * 通常建议优先使用 `interface` 定义对象，需要复杂类型组合时使用 `type`。

**12. 什么是可选属性（Optional Properties）？**

* 在属性名后加 `?`，表示该属性可以不存在。

**13. 什么是只读属性（Readonly properties）？**

* 在属性名前加 `readonly`，初始化后不可修改。

**14. 接口可以继承吗？**

* 可以，使用 `extends` 关键字。接口支持多重继承。

**15. 什么是索引签名（Index Signature）？**

* 当不知道对象具体属性名，但知道 key 和 value 的类型时使用。

    ```typescript
    interface StringArray {
      [index: number]: string;
    }
    ```

---

## 第三部分：函数与类 (Functions & Classes)

**16. 什么是函数重载（Function Overloading）？**

* 允许为同一个函数提供多个函数类型定义，以便根据不同的参数类型或数量返回不同的结果。
* 注意：最终的实现签名必须兼容所有的重载签名。

**17. 解释 TypeScript 中的 `public`、`private`、`protected`。**

* `public`：默认，可以在任何地方访问。
* `private`：只能在定义它的类内部访问。
* `protected`：只能在定义它的类及其子类中访问。

**18. 什么是抽象类（Abstract Class）？**

* 不能被实例化的类，专门作为基类使用。可以包含实现细节，也可以包含抽象方法（强制子类实现）。

**19. 什么是构造函数参数属性（Parameter Properties）？**

* 一种简写语法，在构造函数参数前加修饰符，自动将其定义为类属性并赋值。

    ```typescript
    constructor(public name: string) {} // 等同于声明属性并赋值
    ```

**20. 什么是 `this` 参数在函数中的类型声明？**

* 为了显式约束函数运行时 `this` 的指向，可以在函数第一个参数列表声明 `this` 的类型（编译后会被移除）。

---

## 第四部分：泛型 (Generics) —— 进阶核心

**21. 什么是泛型？为什么要使用它？**

* **答案：** 泛型是指在定义函数、接口或类时，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
* **作用：** 提高代码复用性，同时保持类型安全（避免使用 `any`）。

**22. 泛型约束（Generic Constraints）是什么？**

* 使用 `extends` 关键字限制泛型必须符合某种结构。

    ```typescript
    function echo<T extends { length: number }>(arg: T): T {
      console.log(arg.length); // 必须有 length 属性
      return arg;
    }
    ```

**23. 解释 `keyof` 操作符。**

* 获取某种类型的所有键（key）的联合类型。

    ```typescript
    interface User { name: string; age: number; }
    type Keys = keyof User; // "name" | "age"
    ```

**24. 解释 `typeof` 操作符在 TS 中的用法。**

* JS 中用于获取运行时类型，TS 中用于获取变量或对象的**类型结构**。

    ```typescript
    const user = { name: "John", age: 30 };
    type UserType = typeof user; // { name: string; age: number; }
    ```

---

## 第五部分：高级类型与工具类型 (Advanced & Utility Types)

**25. 什么是交叉类型（Intersection Types）？**

* 将多个类型合并为一个类型（取并集属性）。语法：`TypeA & TypeB`。

**26. 解释 `Partial<T>`。**

* 将类型 T 的所有属性变为可选。

**27. 解释 `Required<T>`。**

* 将类型 T 的所有属性变为必选。

**28. 解释 `Readonly<T>`。**

* 将类型 T 的所有属性变为只读。

**29. 解释 `Pick<T, K>`。**

* 从类型 T 中挑选部分属性 K 来构造新类型。

**30. 解释 `Omit<T, K>`。**

* 从类型 T 中剔除属性 K，构造新类型。

**31. 解释 `Record<K, T>`。**

* 构造一个对象类型，其属性键为 K，属性值为 T。常用于映射对象。

**32. 什么是类型守卫（Type Guards）？**

* 在运行时检查类型以缩小类型范围。
* 方式：`typeof`，`instanceof`，以及自定义类型谓词（`parameter is Type`）。

    ```typescript
    function isString(test: any): test is string {
        return typeof test === "string";
    }
    ```

**33. 什么是条件类型（Conditional Types）？**

* 语法类似于三元运算符：`T extends U ? X : Y`。

**34. `infer` 关键字的作用是什么？**

* 在条件类型中用于推断类型变量。常用于提取函数返回值类型或数组元素类型。

    ```typescript
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
    ```

**35. 什么是 `Mapped Types`（映射类型）？**

* 基于旧类型创建新类型的一种方式，通常结合 `keyof` 使用。

    ```typescript
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    }
    ```

---

## 第六部分：配置与生态 (Config & Ecosystem)

**36. `tsconfig.json` 文件的作用？**

* 指定编译该项目所需的根文件和编译选项。

**37. 解释 `noImplicitAny` 选项。**

* 当开启时，如果无法推断变量类型且未显式指定，TS 会报错（防止隐式 `any`）。

**38. 解释 `strictNullChecks` 选项。**

* 开启后，`null` 和 `undefined` 只能赋值给它们自己或 `any`（不能赋值给 number/string 等）。这是减少运行时 "undefined is not a function" 错误的关键配置。

**39. 什么是 `.d.ts` 文件？**

* 类型定义文件（Declaration Files）。它只包含类型信息，不包含逻辑代码，用于让 TS 识别 JS 库的类型。

**40. 什么是 `const` 断言 (`as const`)？**

* 告诉编译器该表达式是不可变的，将其推断为最窄的字面量类型，而不是宽泛的类型（例如推断为 `"hello"` 而不是 `string`，推断数组为 `readonly` 元组）。

---

## 第七部分：实战场景题 (Scenario Based)

**41. 如何让一个接口的部分属性变为可选，其他保持不变？**

* 使用组合工具类型：`Pick<T, K> & Partial<Omit<T, K>>` (或者直接手写映射类型)。

**42. 如何获取 Promise 返回值的类型？**

* 使用 `Awaited<T>` (TS 4.5+) 或自定义 `infer`。

    ```typescript
    type MyResult = Awaited<Promise<string>>; // string
    ```

**43. 什么是非空断言操作符（!）？**

* 后缀 `!`（如 `item!.name`），告诉编译器“我确定这个值不是 null 或 undefined”，强制跳过空值检查。慎用。

**44. TypeScript 装饰器（Decorators）是什么？**

* 一种特殊类型的声明，可以附加到类声明、方法、访问符、属性或参数上。本质上是高阶函数，用于元编程。

**45. 什么是协变（Covariance）和逆变（Contravariance）？**

* 这是较难的类型理论。简单来说：
  * **对象/返回值是协变的**：允许子类型赋值给父类型。
  * **函数参数是逆变的**（在开启 strictFunctionTypes 时）：允许父类型赋值给子类型。

**46. 如何在 Window 对象上扩展全局属性？**

* 使用声明合并（Declaration Merging）。

    ```typescript
    declare global {
      interface Window {
        myCustomProp: string;
      }
    }
    ```

**47. `unknown` 类型如何安全使用？**

* 必须在使用前进行类型收窄。例如使用 `if (typeof val === 'string') { ... }`。

**48. 什么是 `Module Augmentation`？**

* 用于扩展第三方库的类型定义。

**49. 解释 `Exclude<T, U>` 和 `Extract<T, U>`。**

* `Exclude`：从 T 中排除可以赋值给 U 的类型。
* `Extract`：从 T 中提取可以赋值给 U 的类型。

**50. TypeScript 5.0+ 有什么新特性？**

* 装饰器标准实现（Stage 3 Decorators）、`const` 类型参数、性能优化等。

*(此处为了篇幅，精选了50道最具代表性的题目，掌握这些足以应对 90% 的 TypeScript 面试。所谓的“100题”通常是这些知识点的变种或拆分。)*

---

### 💡 如何将此内容保存为 PDF？

1. **全选** 上面的文字内容。
2. **粘贴** 到 Markdown 编辑器（如 Typora, Obsidian）或 Word 文档中。
3. 如果使用 Chrome 浏览器，也可以直接右键点击页面 -> 选择 **打印** -> 目标打印机选择 **"另存为 PDF"**。

祝你面试顺利！
