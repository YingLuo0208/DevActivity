const jwt = require('jsonwebtoken');

// 创建并签署 JWT 的函数
function createJWT() {
  const payload = {
    userId: 123,        // 用户ID（载荷中可以存放用户信息）
    username: 'exampleUser' // 用户名
  };
  const secretKey = 'yourSecretKey'; // 密钥，用于签名和验证（需要替换为安全的密钥）

  // 使用 payload 和 secretKey 生成 JWT
  const token = jwt.sign(payload, secretKey);

  console.log('JWT Token:', token); // 打印生成的 Token
}

// 调用函数创建并签署 JWT
createJWT();

// 验证 JWT 的函数
function verifyJWT(token) {
  const secretKey = 'yourSecretKey'; // 用来验证签名的密钥（必须与生成时一致）

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT 验证失败:', err.message); // 验证失败（可能过期或无效）
    } else {
      console.log('JWT 验证成功. 解码结果:', decoded); // 验证成功，返回解码内容
    }
  });
}

// 使用你生成的 JWT 替换 'yourTokenHere' 再测试
const jwtTokenToVerify = 'yourTokenHere';

// 调用函数验证 JWT
verifyJWT(jwtTokenToVerify);

// 解码 JWT 的函数（不验证签名，仅解析）
function decodeJWT(token) {
  const decoded = jwt.decode(token); // 直接解析 payload（不保证安全性）

  console.log('解码后的 JWT:', decoded);
}

// 使用你生成的 JWT 替换 'yourTokenHere' 再测试
const jwtToken = 'yourTokenHere';

// 调用函数解码 JWT
decodeJWT(jwtToken);
