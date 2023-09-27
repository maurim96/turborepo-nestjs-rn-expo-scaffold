import React from "react";
import type { TextInputProps as RNTextInputProps } from "react-native";
import { TextInput as RNTextInput } from "react-native";
import { cn } from "~/utils/helpers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TextInputProps extends RNTextInputProps {}

const TextInput: React.FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <RNTextInput
      className={cn(
        "h-14 border border-gray-400 rounded-xl px-4 w-full text-sm",
        className,
      )}
      {...props}
    />
  );
};

TextInput.displayName = "TextInput";

export default TextInput;
