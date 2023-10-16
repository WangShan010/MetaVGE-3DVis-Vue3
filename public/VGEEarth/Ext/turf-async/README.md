# turf-async

**turfAsync** 使 **Turf** 可以在 **Web Worker** 中运行，避免计算量较大时造成页面阻塞卡死。

Turf 仓库：https://github.com/Turfjs/turf



## 1、适用场景

本项目将 Turf 的全部运算函数封装到了 **多线程** 中，全局使用 **async/await** 进行调用，如果计算错误，则返回 **null** 。

- 引入 **turfAsync** 的同时，也会在全局 windows 引入 turf (V6.5.0)。

- **turfAsync** 的 API 与 **turf** 完全一致，例如 turf. distance() 与 turfAsync.distance() 相同。

- 可以将计算量较大的计算单元使用 turfAsync 替代 turf，运算耗时相差无几。

  >示例：对 2.2MB 的中国边界进行缓冲区分析时，turf 会造成页面卡死无响应近 7秒，用户体验极差。换成 turfAsync ，可完美解决这个问题。

- 在线演示：
  - 中国边界缓冲区分析： [大计算量 ](./example/2.大计算量.html)



注意：

- 在项目使用中，**turfAsync** 应按需使用，不建议完全替换 **Turf**。

  >众所周知，多线程的通信是存在性能损耗的（虽然单次通信的延迟 1ms 都不到）。但如果单个计算单元的运算量非常小，而过于频繁调用多线程通讯，反而会造成耗时增加。
  >
  >示例：例如遍历求算 10000 次多段线的长度求和，turf.js 耗时 15ms，turfAsync 耗时 1131ms。

- 在线演示：
  - 一万次线要素长度求和： [多线程通信性能损耗 ](./example/3.多线程通信性能损耗.html)







## 2、使用方式

示例代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="./turf-async/index.js"></script>
</head>
<body>
<script>
    async function main() {
        // 第一次使用时，需要初始化多线程，这一步是必要的！
        await turfAsync.init();
        let point = await turfAsync.point([-75.343, 39.984]);
        console.log(point);
    }
    main();
</script>
</body>
</html>
```

运行效果：

![log](https://fgyao.oss-cn-beijing.aliyuncs.com/turf-async/doc/log.png)



## 3、贡献者

- wangshan010
