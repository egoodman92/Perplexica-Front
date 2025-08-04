import { Settings } from 'lucide-react';
import EmptyChatMessageInput from './EmptyChatMessageInput';
import { File } from './ChatWindow';
import Link from 'next/link';

const SuggestedPrompt = ({ sendMessage, promptText }: { sendMessage: (message: string) => void; promptText: string }) => {
  return (
    <div className="bg-light-secondary dark:bg-dark-secondary p-3 rounded-lg border border-light-200 dark:border-dark-200 hover:bg-light-200 dark:hover:bg-dark-200 transition-colors cursor-pointer"
         onClick={() => sendMessage(promptText)}>
      <div className="flex flex-col space-y-1.5">
        <p className="text-black/70 dark:text-white/70 text-sm leading-snug">
          &ldquo;{promptText}&rdquo;
        </p>
        <p className="text-black/50 dark:text-white/50 text-xs">
          Click to search →
        </p>
      </div>
    </div>
  );
};

const EmptyChat = ({
  sendMessage,
  focusMode,
  setFocusMode,
  optimizationMode,
  setOptimizationMode,
  fileIds,
  setFileIds,
  files,
  setFiles,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
  fileIds: string[];
  setFileIds: (fileIds: string[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  return (
    <div className="relative">
      <div className="absolute w-full flex flex-row items-center justify-end mr-5 mt-5">
        <Link href="/settings">
          <Settings className="cursor-pointer lg:hidden" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-2 space-y-4">
        <div className="flex flex-col items-center justify-center w-full space-y-8">
          <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
            Find Equipment.
          </h2>
          <EmptyChatMessageInput
            sendMessage={sendMessage}
            focusMode={focusMode}
            setFocusMode={setFocusMode}
            optimizationMode={optimizationMode}
            setOptimizationMode={setOptimizationMode}
            fileIds={fileIds}
            setFileIds={setFileIds}
            files={files}
            setFiles={setFiles}
          />
        </div>
        <div className="flex flex-col w-full gap-4 mt-2 sm:flex-row sm:justify-center">
          <div className="flex-1 w-full">
            <SuggestedPrompt sendMessage={sendMessage} promptText="Show me stainless steel ball valves with 1 inch NPT threading" />
          </div>
          <div className="flex-1 w-full">
            <SuggestedPrompt sendMessage={sendMessage} promptText="Help me find 2 inch diaphragm valves that are triclamp compatible" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
