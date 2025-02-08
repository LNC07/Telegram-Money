import logging
import sqlite3
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

# বটের টোকেন সেট করুন
API_TOKEN = "7897191496:AAGMd8vD1nUqhNpnRttWxXBgLbe5SZ18TTA"
bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

# SQLite ডাটাবেজ কানেকশন
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, points INTEGER DEFAULT 0)")
conn.commit()

# ফাংশন: ইউজারের পয়েন্ট আপডেট করা
def update_points(user_id, points):
    cursor.execute("INSERT INTO users (user_id, points) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET points = points + ?", (user_id, points, points))
    conn.commit()

# ফাংশন: ইউজারের পয়েন্ট দেখানো
def get_points(user_id):
    cursor.execute("SELECT points FROM users WHERE user_id = ?", (user_id,))
    result = cursor.fetchone()
    return result[0] if result else 0

# Start Command
@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    user_id = message.from_user.id
    update_points(user_id, 0)  # নতুন ইউজার হলে এন্ট্রি হবে

    keyboard = InlineKeyboardMarkup()
    keyboard.add(
        InlineKeyboardButton("📺 Watch Ads", url="https://yourgithubpage.com/watch_ads.html"),
        InlineKeyboardButton("💰 My Points", callback_data="check_points")
    )

    await message.answer("👋 Welcome! Watch ads and earn points!", reply_markup=keyboard)

# Check Points
@dp.callback_query_handler(lambda c: c.data == "check_points")
async def check_points(callback_query: types.CallbackQuery):
    user_id = callback_query.from_user.id
    points = get_points(user_id)
    await bot.send_message(user_id, f"💰 Your current points: {points} 🏆")

# Webhook for Updating Points (from website)
@dp.message_handler(lambda message: message.text.startswith("/update_points"))
async def update_user_points(message: types.Message):
    try:
        user_id, points = map(int, message.text.split()[1:])  
        update_points(user_id, points)
        await message.answer(f"✅ {points} points added for user {user_id}!")
    except Exception as e:
        await message.answer("⚠ Error updating points!")

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
