# Notes

## HTTP协议

1. 是什么？

    超文本传输协议（HTTP）作为其中一种，它允许将超文本标记语言文档从web服务器传送给客户端。（由于使用MIME机制/多用途因特网邮件扩展，可以传输多种类型的文件）

2. URL（Uniform Resource Locator / 统一资源定位符）
   ```
    schema://login@host[:port#]/path/..../[?query-string][#anchor]

    /*
     scheme: 协议名（如http,https,ftp）
     login: 登陆信息
     host: 服务器IP/域名
     port#:HTTP服务的默认端口是80，这种情况下端口号可以省略。如果使用了别的端口，必须指明，例如http://www.cnblogs.com:8080
     path: 资源路径
     query-string: 发送给web服务器的数据
     anchor: 片段标识符
     */

     http://www.mywebsite.com/sj/test/test.aspx?name=sivergn&x=true#stuff

    /*
     schema: http
     host: www.mywebsite.com
     path: /sj/test/test.aspx
     Query String: name=sviergn&x=true
     Anchor: stuff
     */

    ```
   
3. [HTTP消息结构](https://www.runoob.com/http/http-messages.html)

    - 请求消息/Request
        - ```Request Line```／请求行
        Method：请求方法，如GET/POST。|| path-to-resource：所请求的资源在web服务器上的路径。|| HTTP/version-number：HTTP协议版本号。
        - ```Request Header``` / 请求头，记录请求行以外的重要信息。
        - ```Request Body``` / 请求体，携带提交给web服务器的数据。使用GET方法时，为空。


    - 响应消息/Response

        - ```Response Line```／响应行
        HTTP/version-number：HTTP协议版本号。|| status-code：状态码，反应服务器处理是否正常，告知出现的错误。|| message：状态消息，同状态码对应。
        - ```Response Header``` / 响应头，记录响应体数据的相关信息。
        - ```Response Body``` / 响应体，携带需要向web服务器发送的数据。使用GET方法时，为空。

        **注意，Body和Header之间空一行。**

4. HTTP方法

    - GET 获取特定资源
    - POST 上传请求
    - HEAD 获取关于特定资源的响应头

    **GET&POST区别**

    1.数据存放位置
    
        GET：将数据放在URL之后，以?连接；参数之间以&进行拼接，例如：EditPosts.aspx?name=test1&id=12345
        POST：数据放在Request Body中。
    
    2.数据大小限制

        GET：所提交数据的大小有限制（因为浏览器对URL的长度有限制）。
        POST：没有限制。
    
    3.安全性

        GET：所提交的数据以明文的形式显示在URL上。
        POST：由于保存在Request Body中，增加了安全系数。

    4.缓存
        GET：缓存服务器返回的响应。
        POST：不缓存。

5.状态码（由三位数字和状态消息组成）

- 1XX（信息描述）：接受的请求正在处理。

- 2XX（成功状态）：请求正常处理完毕。其中206表示请求部分内容成功/Range。

- 3XX（重定向状态）：需要进行附加操作以完成请求。

- 4XX（客户端错误）：服务器无法处理请求。

- 5XX（服务器错误）：服务器处理请求出错。

6.Header Field

Request Header Field / 请求头域
   - User-Agent：客户端程序信息。
   - Range：获取资源的范围（从0开始，末尾位置为文件长度 - 1），单位字节：
   - bytes=500-1000，从500开始，下载到1000。
   - bytes=500-，从500开始下载，直至数据末尾。
   - bytes=-500，从0开始下载到500。

Response Header Field / 响应头域
   - Content-Length：Response Body数据的大小（字节）。
   - Keep-Alive：服务器端的超时限制/timeout，最大同时连接数/max。
   - Content-Type：Response Body数据的的媒体类型（MIME）。注意，如果利用POST请求向服务器上传文件，则需遵从以下格式：
   ```
    /*
    1. form-data;和boundary=之间有一个空格。
    2. boundary=之后的内容可以是任意字符串。
    */

    multipart/form-data;(空格)boundary=---------------------------195362999817818974031690194806
   ```

7.理解HTTP通讯方式

- 客户端和服务器的通讯是有来有回的，而且总是以客户端首先发起请求，服务器进行响应的形式发生。
- 所谓通讯就是传输数据，根据数据的大小，可以将其分为-三种类型：（c表示客户端；s表示服务器）

    c小：s小，适用方法GET / POST。

    c小：s大，适用方法GET / POST。

    c大：s小，适用方法POST。

- 注意，对于客户端来说，不管是上传还是下载大数据，都需要解决内存管理问题。





