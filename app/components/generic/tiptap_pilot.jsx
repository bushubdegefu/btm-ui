import RichTextEditor, { BaseKit } from "reactjs-tiptap-editor";

// Import CSS
import "reactjs-tiptap-editor/style.css";

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true,
    },

    // Character count
    characterCount: {
      limit: 50_000,
    },
  }),
];

const DEFAULT = "";

const TipTapPilot = () => {
  const [content, setContent] = useState(DEFAULT);

  const onChangeContent = (value) => {
    setContent(value);
  };

  return (
    <RichTextEditor
      output="html"
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  );
};

export default TipTapPilot;
