import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, Music, FileText, BookOpen, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

/**
 * Design Philosophy: Wellness Minimalism with Spiritual Depth
 * - Breathing space with generous whitespace
 * - Chakra colors used meaningfully for each day
 * - Asymmetric layout with left-aligned content
 * - Subtle animations and progressive disclosure
 */

const chakraData = [
  {
    day: 1,
    name: "Ground",
    sanskrit: "Muladhara",
    chakraColor: "#c41e3a",
    theme: "Root Chakra",
    goal: "สร้างรากฐานความมั่นคง ความรู้สึกปลอดภัย และการกลับมาเชื่อมต่อกับร่างกาย",
    benefits: ["ความมั่นคง", "ความปลอดภัย", "การเชื่อมต่อกับร่างกาย"],
    audio: "Grounding Meditation",
    audioUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663374053388/HGjGwyUt25tZ9jny8iaQBp/chakra1-meditation_558a7052.mp3",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-2_1771746671000_na1fn_Y2hha3JhLXJvb3Q.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTJfMTc3MTc0NjY3MTAwMF9uYTFmbl9ZMmhoYTNKaExYSnZiM1EucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nMAnsHFO00hIudQ4d1EplN63utXfx38rmBNxbd0~1iwBAg1F5H5Hb3cdijCAvBwlq0Ekws3QVesR49DYmUPehFbT9l1t~rs~d1BV-a-2XjZgbxLXlHsSIvUdaPDTDngCsHTLt7CGcUAgXy1BZGb31nMKkJI9F6DauoTmW3KQ9AZJKca1jPnJp1TrAirrFHuxVTdASyKswbEUi6gXKsgeOK845J0K2cJtigWGMDQ1yGs8Rp~e1CieVrcPxO0MnPw5vuqza2ZD4PKvF6x4PXiHFJ3frFkis~qSaGDi3WHXZRY4BG8-boGOhRoUtogMK7bKqEY9GHM-0BVI6EtVp6rMvg__",
  },
  {
    day: 2,
    name: "Emotional Reset",
    sanskrit: "Svadhisthana",
    chakraColor: "#ff7f00",
    theme: "Sacral Chakra",
    goal: "ปลดล็อกอารมณ์ที่ตกค้าง ฟื้นฟูพลังสัญชาตญาณ ความคิดสร้างสรรค์ และความสุข",
    benefits: ["ความสุข", "ความคิดสร้างสรรค์", "การปล่อยอารมณ์"],
    audio: "Emotional Release Meditation",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-3_1771746677000_na1fn_Y2hha3JhLWhlYXJ0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTNfMTc3MTc0NjY3NzAwMF9uYTFmbl9ZMmhoYTNKaExXaGxZWEowLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Jo1OfJpQYXVMKIlbqbiq27QLqQY5uxOakxmDcJYWg1gRoUPwpNrDLhEgOGL0-DU4rQ~dIFeCGWm1JG-4LYgrb--D32so7GgOHcUoInwdiVIPByHjzMg~ZxU0TFB68PYmiXqb1PLuwbVIsqTAgapw4eLQEasQCSpwnKDcEzaj4jpuHZZy2t63kbjNRL7KwnEvD09pzy214dLtZIrcWYuPcpfF0uNI59w~vyu39YOgoKExTjqrNOcA-w~k~q-iriTZThCws5NZa-6CyhQzQJfYYaRpp74NEaR8VlL3iwjna118UjMxRB3eVLdwkXvjEG0VBuM7GvEBAm1frMLIKP7yyA__",
  },
  {
    day: 3,
    name: "Power Reclaim",
    sanskrit: "Manipura",
    chakraColor: "#ffd700",
    theme: "Solar Plexus Chakra",
    goal: "ทวงคืนความมั่นใจ พลังใจ และการเคารพในตัวเอง (Self-worth)",
    benefits: ["ความมั่นใจ", "พลังใจ", "ความเคารพในตัวเอง"],
    audio: "Fire Element Meditation",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-2_1771746671000_na1fn_Y2hha3JhLXJvb3Q.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTJfMTc3MTc0NjY3MTAwMF9uYTFmbl9ZMmhoYTNKaExYSnZiM1EucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nMAnsHFO00hIudQ4d1EplN63utXfx38rmBNxbd0~1iwBAg1F5H5Hb3cdijCAvBwlq0Ekws3QVesR49DYmUPehFbT9l1t~rs~d1BV-a-2XjZgbxLXlHsSIvUdaPDTDngCsHTLt7CGcUAgXy1BZGb31nMKkJI9F6DauoTmW3KQ9AZJKca1jPnJp1TrAirrFHuxVTdASyKswbEUi6gXKsgeOK845J0K2cJtigWGMDQ1yGs8Rp~e1CieVrcPxO0MnPw5vuqza2ZD4PKvF6x4PXiHFJ3frFkis~qSaGDi3WHXZRY4BG8-boGOhRoUtogMK7bKqEY9GHM-0BVI6EtVp6rMvg__",
  },
  {
    day: 4,
    name: "Heart Clear",
    sanskrit: "Anahata",
    chakraColor: "#22b14c",
    theme: "Heart Chakra",
    goal: "คลายรับาด ผล และจุดรองความสัมพันธ์ เรียนรู้ที่จะให้อภัย และเปิดรับความรัก (Self-Love)",
    benefits: ["ความรัก", "การให้อภัย", "ความเห็นอกเห็นใจ"],
    audio: "Green Light Heart Healing",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-3_1771746677000_na1fn_Y2hha3JhLWhlYXJ0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTNfMTc3MTc0NjY3NzAwMF9uYTFmbl9ZMmhoYTNKaExXaGxZWEowLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Jo1OfJpQYXVMKIlbqbiq27QLqQY5uxOakxmDcJYWg1gRoUPwpNrDLhEgOGL0-DU4rQ~dIFeCGWm1JG-4LYgrb--D32so7GgOHcUoInwdiVIPByHjzMg~ZxU0TFB68PYmiXqb1PLuwbVIsqTAgapw4eLQEasQCSpwnKDcEzaj4jpuHZZy2t63kbjNRL7KwnEvD09pzy214dLtZIrcWYuPcpfF0uNI59w~vyu39YOgoKExTjqrNOcA-w~k~q-iriTZThCws5NZa-6CyhQzQJfYYaRpp74NEaR8VlL3iwjna118UjMxRB3eVLdwkXvjEG0VBuM7GvEBAm1frMLIKP7yyA__",
  },
  {
    day: 5,
    name: "Voice Boundary",
    sanskrit: "Vishuddha",
    chakraColor: "#0066cc",
    theme: "Throat Chakra",
    goal: "กล้าส่ือสารความจริง การตั้งขอบเขต และพูดในสิ่งที่ต้องการจริงๆ (Boundaries)",
    benefits: ["การสื่อสาร", "การตั้งขอบเขต", "ความสำคัญของตัวเอง"],
    audio: "Sound Healing / Throat Release",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-2_1771746671000_na1fn_Y2hha3JhLXJvb3Q.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTJfMTc3MTc0NjY3MTAwMF9uYTFmbl9ZMmhoYTNKaExYSnZiM1EucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nMAnsHFO00hIudQ4d1EplN63utXfx38rmBNxbd0~1iwBAg1F5H5Hb3cdijCAvBwlq0Ekws3QVesR49DYmUPehFbT9l1t~rs~d1BV-a-2XjZgbxLXlHsSIvUdaPDTDngCsHTLt7CGcUAgXy1BZGb31nMKkJI9F6DauoTmW3KQ9AZJKca1jPnJp1TrAirrFHuxVTdASyKswbEUi6gXKsgeOK845J0K2cJtigWGMDQ1yGs8Rp~e1CieVrcPxO0MnPw5vuqza2ZD4PKvF6x4PXiHFJ3frFkis~qSaGDi3WHXZRY4BG8-boGOhRoUtogMK7bKqEY9GHM-0BVI6EtVp6rMvg__",
  },
  {
    day: 6,
    name: "Insight Reset",
    sanskrit: "Ajna",
    chakraColor: "#4b0082",
    theme: "Third Eye Chakra",
    goal: "ปิดสวิตช์ความสับสนวุ่นวาย เชื่อมต่อกับสัญชาตญาณ และมองเห็นเป้าหมายชัดเจนขึ้น (Intuition)",
    benefits: ["สัญชาตญาณ", "ความชัดเจน", "การเยียวยาตัวเอง"],
    audio: "Subconscious Guided Meditation",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-2_1771746671000_na1fn_Y2hha3JhLXJvb3Q.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTJfMTc3MTc0NjY3MTAwMF9uYTFmbl9ZMmhoYTNKaExYSnZiM1EucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nMAnsHFO00hIudQ4d1EplN63utXfx38rmBNxbd0~1iwBAg1F5H5Hb3cdijCAvBwlq0Ekws3QVesR49DYmUPehFbT9l1t~rs~d1BV-a-2XjZgbxLXlHsSIvUdaPDTDngCsHTLt7CGcUAgXy1BZGb31nMKkJI9F6DauoTmW3KQ9AZJKca1jPnJp1TrAirrFHuxVTdASyKswbEUi6gXKsgeOK845J0K2cJtigWGMDQ1yGs8Rp~e1CieVrcPxO0MnPw5vuqza2ZD4PKvF6x4PXiHFJ3frFkis~qSaGDi3WHXZRY4BG8-boGOhRoUtogMK7bKqEY9GHM-0BVI6EtVp6rMvg__",
  },
  {
    day: 7,
    name: "Crown Alignment",
    sanskrit: "Sahasrara",
    chakraColor: "#9932cc",
    theme: "Crown Chakra",
    goal: "จัดศูนย์รวมพลังงานทั้งหมด เชื่อมต่อกับตัวตนที่สูงกว่า และความสงบสบาย (Higher Self)",
    benefits: ["การเชื่อมต่อจิตใจ", "ความสงบ", "ความสมดุล"],
    audio: "Deep Brain Wave Meditation",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-4_1771746671000_na1fn_Y2hha3JhLWNyb3du.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTRfMTc3MTc0NjY3MTAwMF9uYTFmbl9ZMmhoYTNKaExXTnliM2R1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=p8LvNfC34a759tNM7gCjSkfPXqMKtQ6B1bbMClBkxgV6qTvpQuL8zSoi7XdlztHGsqE61dAVuu2DPGdC8IadMo6ZJAId7UviVER7m9jfVoLt4wsbGk6T0M3jKx~J~QUaNQ1VVt-UlEOjmKbSr9-9vojaWbHvBxlkZfNgqKdWk5R~vRRVnvA0ERFkq8EaMhLrOlhwFmNeQUtr7Zrk0NJAn1MZ2BrDMy7yVippE2nVuq~0bzlEWyVdv~8Xx6OFeQmPyrXGbLkIcWvmyH-ZVFdBbwo1VRsZlRJ7qAKTelXJz1j~5L01d1waePxLYnUUEvNCJ8h4bj6FE-GrirjQ8TsZzQ__",
  },
];

function ChakraCard({ chakra, isExpanded, onToggle }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="mb-8 scroll-mt-20" id={`day-${chakra.day}`}>
      <div
        className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
        style={{ borderLeft: `6px solid ${chakra.chakraColor}` }}
      >
        <div
          className="p-6 cursor-pointer bg-white hover:bg-opacity-95 transition-colors"
          onClick={onToggle}
          style={{ borderTop: `4px solid ${chakra.chakraColor}` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: chakra.chakraColor }}
                >
                  {chakra.day}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {chakra.name}
                  </h2>
                  <p className="text-sm text-gray-500 italic">
                    {chakra.sanskrit} — {chakra.theme}
                  </p>
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="bg-gray-50 border-t border-gray-200 p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Goal Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                เป้าหมายของวันนี้
              </h3>
              <p className="text-gray-700 leading-relaxed">{chakra.goal}</p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                สิ่งที่คุณจะได้รับ
              </h3>
              <div className="flex flex-wrap gap-2">
                {chakra.benefits.map((benefit: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-medium text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: chakra.chakraColor }}
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Audio Info */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Music
                    className="w-5 h-5"
                    style={{ color: chakra.chakraColor }}
                  />
                  <h4 className="font-semibold text-gray-800">เสียงสมาธิ</h4>
                </div>
                <p className="text-gray-600 text-sm">{chakra.audio}</p>
                <p className="text-xs text-gray-500 mt-2">ระยะเวลา: 20-30 นาที</p>
            </div>

            {/* Audio Player */}
            {chakra.audioUrl && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  🎧 เครื่องเล่นเสียง
                </p>
                <audio
                  ref={audioRef}
                  src={chakra.audioUrl}
                  onEnded={handleAudioEnd}
                  className="w-full"
                  controls
                />
              </div>
            )}

            {/* Image */}
            {chakra.image && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={chakra.image}
                  alt={chakra.name}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4">
              {chakra.audioUrl && (
                <Button
                  onClick={toggleAudio}
                  className="flex-1 text-white font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: chakra.chakraColor }}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      หยุดเสียง
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      ฟังเสียงสมาธิ
                    </>
                  )}
                </Button>
              )}
              {!chakra.audioUrl && (
                <Button
                  disabled
                  className="flex-1 text-white font-semibold opacity-50"
                  style={{ backgroundColor: chakra.chakraColor }}
                >
                  <Music className="w-4 h-4 mr-2" />
                  ฟังเสียงสมาธิ (เร็ว ๆ นี้)
                </Button>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Chakra Reset 7 Days
              </h1>
              <p className="text-gray-600 text-sm">
                รีเซ็ตพลังงานเยียวยาจิตใจกลับมาเป็นตัวเอง
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-amber-600" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              เริ่มต้นการเยียวยาตัวเองของคุณ
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              โปรแกรม 7 วันนี้จะนำคุณผ่านการเดินทางจากจักระราก ไปจนถึงจักระมงกุฎ
              เพื่อปลดล็อกพลังงานและเยียวยาจิตใจของคุณ
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-amber-600" />
                <span className="text-gray-700">
                  เสียงสมาธิ 20-30 นาที ต่อวัน
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-600" />
                <span className="text-gray-700">
                  แบบฝึกหัดและการเขียนบันทึก
                </span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span className="text-gray-700">
                  คำแนะนำเตรียมตัวและพื้นที่ศักดิ์สิทธิ์
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/hxbEtpqyVt6LOzLuStSM6A/sandbox/aj0mPNF0oSCFEe4LpznrRI-img-5_1771746680000_na1fn_bWVkaXRhdGlvbi1qb3VybmV5.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaHhiRXRwcXlWdDZMT3pMdVN0U002QS9zYW5kYm94L2FqMG1QTkYwb1NDRkVlNExwem5yUkktaW1nLTVfMTc3MTc0NjY4MDAwMF9uYTFmbl9iV1ZrYVhSaGRHbHZiaTFxYjNWeWJtVjUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=aE9iAUPpwGVG3HVcot~daQ1HyHMbkj6MLvCbl662CEVK3-LLupsy-Ov206ncIfDvsdS6B-1mkqSO00X~eSN3FaX8m2nqC4jEvFNQ5OWLdlRAdQGJ~S~4RwTTsmaGORVhwz8rZ-MoOQJgfjUuAZH6nPGugFvPaO-Z6oCMVKdOsNIHGcOHpY4SiQiJxq7pOQjz~OWikVPUJHC6JNf1ZGbU-tZfucEijEk0h~2Sizcjm0F4YSC-Glzr-foRg600h6dgNgb3gjOsk8~Wk43fN9i3V2ziJ8Ls2jgHKtdkLtg238JSJ-i~uhBY74X8lvCGev4D742cXUvGcKQ7tLeW2C9SGg__"
              alt="7 Chakra Journey"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content - Chakra Cards */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          ทั้ง 7 วันของการเดินทาง
        </h2>

        <div className="space-y-4">
          {chakraData.map((chakra) => (
            <ChakraCard
              key={chakra.day}
              chakra={chakra}
              isExpanded={expandedDay === chakra.day}
              onToggle={() =>
                setExpandedDay(expandedDay === chakra.day ? null : chakra.day)
              }
            />
          ))}
        </div>
      </section>

      {/* Bonus Section */}
      <section className="bg-gradient-to-r from-amber-100 to-amber-50 py-12 mt-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            ✨ โบนัสพิเศษ
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-l-4" style={{ borderLeftColor: "#d4a574" }}>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Pre-Course Guide
              </h3>
              <p className="text-gray-600">
                แนะนำวิธีเตรียมตัว การจัดบรรยากาศห้อง การดื่มน้ำ และการเปิดใจรับฟัง
              </p>
            </Card>

            <Card className="p-6 border-l-4" style={{ borderLeftColor: "#d4a574" }}>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Sacred Space Setup
              </h3>
              <p className="text-gray-600">
                สร้างพื้นที่ศักดิ์สิทธิ์ส่วนตัว เพื่อเพิ่มประสิทธิภาพการปฏิบัติ
              </p>
            </Card>

            <Card className="p-6 border-l-4" style={{ borderLeftColor: "#d4a574" }}>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                SOS Audio Track
              </h3>
              <p className="text-gray-600">
                ไฟล์เสียงสั้น 3 นาที สำหรับฟังเวลาแพนิกหรือหลุดโฟกัส
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="container text-center">
          <p className="mb-2">
            © 2024 Chakra Reset 7 Days - รีเซ็ตพลังงานเยียวยาจิตใจ
          </p>
          <p className="text-sm text-gray-500">
            โปรแกรมเยียวยาตัวเองผ่านพลังงานจักระทั้ง 7
          </p>
        </div>
      </footer>
    </div>
  );
}
