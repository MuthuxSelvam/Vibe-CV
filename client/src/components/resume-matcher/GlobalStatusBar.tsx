import { motion } from "framer-motion";
import { Activity, CheckCircle2, Server } from "lucide-react";

export function GlobalStatusBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/50 border-b border-white/5 py-2 px-6 flex items-center justify-between text-xs text-slate-400 font-mono"
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>System Status: Operational</span>
                </div>
                <div className="flex items-center gap-2">
                    <Server className="w-3 h-3" />
                    <span>Model: VibeMatch-v2.1 (Latest)</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    <span>Latency: 45ms</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Privacy: Local-First</span>
                </div>
            </div>
        </motion.div>
    );
}
