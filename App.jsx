import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoteMenuCard from './VoteManu';

const INITIAL_MENUS = [
  {
    id: 1,
    name: 'ข้าวผัดกะเพราเนื้อวากิวไข่ดาวกรอบ',
    price: 189,
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    votesCount: 0,
    voters: [],
  },
  {
    id: 2,
    name: 'ชาไทยเย็นพรีเมียมเข้มข้น',
    price: 85,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    votesCount: 0,
    voters: [],
  },
  {
    id: 3,
    name: 'พิซซ่าเตาถ่านหน้าทรัฟเฟิล',
    price: 320,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    votesCount: 0,
    voters: [],
  },
];

export default function App() {
  const [menus, setMenus] = useState(INITIAL_MENUS);
  const [isOpenForm, setIsOpenForm] = useState(false);

  // ระบบนับเวลาถอยหลัง 5 นาที (300 วินาที)
  const [timeLeft, setTimeLeft] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Form State เพิ่มเมนู
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Modal State สำหรับคนโหวต
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [voterName, setVoterName] = useState('');

  // Timer Effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartVoting = () => {
    setTimeLeft(300); // รีเซ็ตเป็น 5 นาที
    setIsTimerRunning(true);
  };

  // เพิ่มเมนูใหม่
  const handleAddMenu = (e) => {
    e.preventDefault();
    if (!name || !price) return alert('กรุณากรอกชื่อและราคา');

    const newMenuItem = {
      id: Date.now(),
      name,
      price: Number(price),
      imageUrl: imageUrl.trim() || 'https://placehold.co/400x400?text=Food',
      votesCount: 0,
      voters: [],
    };

    setMenus([newMenuItem, ...menus]);
    setName('');
    setPrice('');
    setImageUrl('');
    setIsOpenForm(false);
  };

  // บันทึกผลโหวตพร้อมชื่อคนโหวต
  const handleConfirmVote = (e) => {
    e.preventDefault();
    if (!voterName.trim()) return alert('กรุณาใส่ชื่อของคุณ');

    setMenus((prev) =>
      prev.map((item) => {
        if (item.id === activeMenuId) {
          return {
            ...item,
            votesCount: item.votesCount + 1,
            voters: [...item.voters, voterName.trim()],
          };
        }
        return item;
      })
    );

    setVoterName('');
    setActiveMenuId(null);
  };

  // จัดเรียง: เอาเมนูที่ถูกโหวตแล้ว (votesCount > 0) หลบลงไปอยู่ด้านหลัง
  const sortedMenus = [...menus].sort((a, b) => {
    if (a.votesCount > 0 && b.votesCount === 0) return 1;
    if (a.votesCount === 0 && b.votesCount > 0) return -1;
    return b.votesCount - a.votesCount;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              🍽️ เดินถือไปโหวตเมนู
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              กดโหวตแล้วใส่ชื่อเพื่อนได้เรื่อยๆ เลย!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* กล่องนับเวลา 5 นาที */}
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
              <span className="text-lg">⏱️</span>
              <span className={`font-mono text-lg font-bold ${timeLeft < 60 ? 'text-rose-600 animate-pulse' : 'text-slate-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            {!isTimerRunning ? (
              <button
                onClick={handleStartVoting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition"
              >
                ▶ เริ่มโหวต (5 นาที)
              </button>
            ) : (
              <span className="rounded-xl bg-emerald-100 border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700">
                ● กำลังเปิดโหวต
              </span>
            )}

            <button
              onClick={() => setIsOpenForm(!isOpenForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition"
            >
              {isOpenForm ? '✕ ปิด' : '➕ เพิ่มเมนู'}
            </button>
          </div>
        </header>

        {/* ฟอร์มสร้างเมนู */}
        <AnimatePresence>
          {isOpenForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddMenu}
              className="overflow-hidden bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-indigo-100 shadow-lg mb-6"
            >
              <h2 className="text-base font-bold text-slate-800 mb-3">✨ เพิ่มเมนูใหม่</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="ชื่อเมนู *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="ราคา (บาท) *"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  required
                />
                <input
                  type="url"
                  placeholder="URL รูปภาพ (เว้นว่างได้)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpenForm(false)}
                  className="px-3 py-1.5 text-xs text-slate-500"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  บันทึกเมนู
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* กรณีไม่มีเมนู (Empty State) */}
        {menus.length === 0 ? (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300">
            <span className="text-4xl">🍲</span>
            <p className="mt-2 text-slate-500 font-medium">ยังไม่มีใครเพิ่มเมนูตอนนี้</p>
            <p className="text-xs text-slate-400">กดปุ่ม "เพิ่มเมนู" ด้านบนเพื่อเริ่มเพิ่มจานแรกได้เลย</p>
          </div>
        ) : (
          /* Grid แสดงเมนู */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sortedMenus.map((menu) => (
              <VoteMenuCard
                key={menu.id}
                {...menu}
                isVotingActive={isTimerRunning && timeLeft > 0}
                onOpenVoteModal={(id) => setActiveMenuId(id)}
              />
            ))}
          </div>
        )}

        {/* Modal Popup กรอกชื่อคนโหวต */}
        <AnimatePresence>
          {activeMenuId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
              >
                <h3 className="text-lg font-bold text-slate-800">✍️ ใส่ชื่อของคุณ</h3>
                <p className="text-xs text-slate-500 mt-1">
                  กรอกชื่อเพื่อบันทึกคะแนนเสียงลงในเมนูนี้
                </p>

                <form onSubmit={handleConfirmVote} className="mt-4">
                  <input
                    type="text"
                    autoFocus
                    placeholder="เช่น วิน, แป้ง, บอส"
                    value={voterName}
                    onChange={(e) => setVoterName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    required
                  />

                  <div className="mt-5 flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenuId(null);
                        setVoterName('');
                      }}
                      className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                    >
                      ยืนยันโหวต!
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}