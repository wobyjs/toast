export const EmojiButton = ({ onClick, children, emoji }: { onClick: () => void, emoji: string | JSX.Element, children?: JSX.Children, }) => (
    <button
        className="rounded bg-white text-sm font-semibold py-2 px-2 shadow-small-button flex items-center"
        onClick={onClick}
    >
        <span
            style={{
                fontFamily:
                    '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
            }}
        >
            {emoji}
        </span>
        <div className="flex-1 px-3">{children}</div>
    </button>
)
