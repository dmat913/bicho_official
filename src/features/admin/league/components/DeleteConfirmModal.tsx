import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-neutral-800 rounded-lg p-5 sm:p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white-1 mb-3 sm:mb-4">
              削除確認
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 mb-5 sm:mb-6">
              本当に削除してもよろしいですか？
            </p>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-neutral-700 text-white-1 rounded-lg hover:bg-neutral-600 transition-colors text-sm sm:text-base"
              >
                キャンセル
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-red-600 text-white-1 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                削除
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
