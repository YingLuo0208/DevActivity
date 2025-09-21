const bcrypt = require('bcrypt');

// 异步方式：加密密码
async function hashPassword() {
  const password = 'mySecurePassword'; // 要加密的原始密码

  try {
    // 生成一个盐（salt），参数 10 表示加密强度（轮数），数值越大越安全但越耗时
    const salt = await bcrypt.genSalt(10);

    // 使用生成的盐对密码进行哈希加密
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('原始密码:', password);
    console.log('盐:', salt);
    console.log('加密后的密码:', hashedPassword);
  } catch (error) {
    console.error('加密出错:', error);
  }
}

// 调用函数执行加密
hashPassword();


// 异步方式：比较输入密码和数据库中存储的哈希密码
async function comparePassword() {
  const inputPassword = 'mySecurePassword'; // 用户输入的密码
  const hashedPassword = 'yourStoredHashedPassword'; // 数据库存储的哈希密码（需要替换成实际存储的值）

  try {
    // bcrypt.compare 会自动加盐再比对，无需自己处理盐
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

    if (isMatch) {
      console.log('密码正确 ✅');
    } else {
      console.log('密码错误 ❌');
    }
  } catch (error) {
    console.error('比较出错:', error);
  }
}

// 调用函数执行比较
comparePassword();


const password = 'mySecurePassword';

// 同步方式：生成盐并加密密码（不推荐在高并发环境下用同步方式，因为会阻塞线程）
const salt = bcrypt.genSaltSync(10);  // 生成盐
const hashedPassword = bcrypt.hashSync(password, salt); // 使用盐加密

console.log('同步方式加密后的密码:', hashedPassword);
