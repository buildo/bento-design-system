import React, { ReactNode, RefObject, HTMLAttributes, ReactElement, MutableRefObject } from "react";
import { FocusableDOMProps, FocusableProps } from "@react-types/shared";
/**
 * A utility function that focuses an element while avoiding undesired side effects such
 * as page scrolling and screen reader issues with CSS transitions.
 */
export function focusSafely(element: HTMLElement): void;
interface FocusScopeProps {
    /** The contents of the focus scope. */
    children: ReactNode;
    /**
     * Whether to contain focus inside the scope, so users cannot
     * move focus outside, for example in a modal dialog.
     */
    contain?: boolean;
    /**
     * Whether to restore focus back to the element that was focused
     * when the focus scope mounted, after the focus scope unmounts.
     */
    restoreFocus?: boolean;
    /** Whether to auto focus the first focusable element in the focus scope on mount. */
    autoFocus?: boolean;
}
interface FocusManagerOptions {
    /** The element to start searching from. The currently focused element by default. */
    from?: HTMLElement;
    /** Whether to only include tabbable elements, or all focusable elements. */
    tabbable?: boolean;
    /** Whether focus should wrap around when it reaches the end of the scope. */
    wrap?: boolean;
}
interface FocusManager {
    /** Moves focus to the next focusable or tabbable element in the focus scope. */
    focusNext(opts?: FocusManagerOptions): HTMLElement;
    /** Moves focus to the previous focusable or tabbable element in the focus scope. */
    focusPrevious(opts?: FocusManagerOptions): HTMLElement;
    /** Moves focus to the first focusable or tabbable element in the focus scope. */
    focusFirst(opts?: FocusManagerOptions): HTMLElement;
    /** Moves focus to the last focusable or tabbable element in the focus scope. */
    focusLast(opts?: FocusManagerOptions): HTMLElement;
}
/**
 * A FocusScope manages focus for its descendants. It supports containing focus inside
 * the scope, restoring focus to the previously focused element on unmount, and auto
 * focusing children on mount. It also acts as a container for a programmatic focus
 * management interface that can be used to move focus forward and back in response
 * to user events.
 */
export function FocusScope(props: FocusScopeProps): JSX.Element;
/**
 * Returns a FocusManager interface for the parent FocusScope.
 * A FocusManager can be used to programmatically move focus within
 * a FocusScope, e.g. in response to user events like keyboard navigation.
 */
export function useFocusManager(): FocusManager;
/**
 * Create a [TreeWalker]{@link https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker}
 * that matches all focusable/tabbable elements.
 */
export function getFocusableTreeWalker(root: HTMLElement, opts?: FocusManagerOptions, scope?: HTMLElement[]): TreeWalker;
/**
 * Creates a FocusManager object that can be used to move focus within an element.
 */
export function createFocusManager(ref: RefObject<HTMLElement>): FocusManager;
interface FocusRingProps {
    /**
     * Whether to show the focus ring when something
     * inside the container element has focus (true), or
     * only if the container itself has focus (false).
     * @default 'false'
     */
    within?: boolean;
    /** Whether the element is a text input. */
    isTextInput?: boolean;
    /** Whether the element will be auto focused. */
    autoFocus?: boolean;
}
interface FocusRingAria {
    /** Whether the element is currently focused. */
    isFocused: boolean;
    /** Whether keyboard focus should be visible. */
    isFocusVisible: boolean;
    /** Props to apply to the container element with the focus ring. */
    focusProps: HTMLAttributes<HTMLElement>;
}
/**
 * Determines whether a focus ring should be shown to indicate keyboard focus.
 * Focus rings are visible only when the user is interacting with a keyboard,
 * not with a mouse, touch, or other input methods.
 */
export function useFocusRing(props?: FocusRingProps): FocusRingAria;
interface _FocusRingProps1 {
    /** Child element to apply CSS classes to. */
    children: ReactElement;
    /** CSS class to apply when the element is focused. */
    focusClass?: string;
    /** CSS class to apply when the element has keyboard focus. */
    focusRingClass?: string;
    /**
     * Whether to show the focus ring when something
     * inside the container element has focus (true), or
     * only if the container itself has focus (false).
     * @default false
     */
    within?: boolean;
    /** Whether the element is a text input. */
    isTextInput?: boolean;
    /** Whether the element will be auto focused. */
    autoFocus?: boolean;
}
/**
 * A utility component that applies a CSS class when an element has keyboard focus.
 * Focus rings are visible only when the user is interacting with a keyboard,
 * not with a mouse, touch, or other input methods.
 */
export function FocusRing(props: _FocusRingProps1): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
interface FocusableOptions extends FocusableProps, FocusableDOMProps {
    /** Whether focus should be disabled. */
    isDisabled?: boolean;
}
interface FocusableProviderProps extends HTMLAttributes<HTMLElement> {
    /** The child element to provide DOM props to. */
    children?: ReactNode;
}
interface FocusableContextValue extends FocusableProviderProps {
    ref?: MutableRefObject<HTMLElement>;
}
export let FocusableProvider: React.ForwardRefExoticComponent<FocusableProviderProps & React.RefAttributes<HTMLElement>>;
/**
 * Used to make an element focusable and capable of auto focus.
 */
export function useFocusable(props: FocusableOptions, domRef: RefObject<HTMLElement>): {
    focusableProps: FocusableContextValue & {
        tabIndex: number;
        defaultChecked?: boolean;
        defaultValue?: string | number | readonly string[];
        suppressContentEditableWarning?: boolean;
        suppressHydrationWarning?: boolean;
        accessKey?: string;
        className?: string;
        contentEditable?: boolean | "inherit" | "false" | "true";
        contextMenu?: string;
        dir?: string;
        draggable?: boolean | "false" | "true";
        hidden?: boolean;
        id?: string;
        lang?: string;
        placeholder?: string;
        slot?: string;
        spellCheck?: boolean | "false" | "true";
        style?: React.CSSProperties;
        title?: string;
        translate?: "no" | "yes";
        radioGroup?: string;
        role?: string;
        about?: string;
        datatype?: string;
        inlist?: any;
        prefix?: string;
        property?: string;
        resource?: string;
        typeof?: string;
        vocab?: string;
        autoCapitalize?: string;
        autoCorrect?: string;
        autoSave?: string;
        color?: string;
        itemProp?: string;
        itemScope?: boolean;
        itemType?: string;
        itemID?: string;
        itemRef?: string;
        results?: number;
        security?: string;
        unselectable?: "on" | "off";
        inputMode?: "search" | "none" | "text" | "decimal" | "numeric" | "tel" | "url" | "email";
        is?: string;
        'aria-activedescendant'?: string;
        'aria-atomic'?: boolean | "false" | "true";
        'aria-autocomplete'?: "both" | "none" | "inline" | "list";
        'aria-busy'?: boolean | "false" | "true";
        'aria-checked'?: boolean | "mixed" | "false" | "true";
        'aria-colcount'?: number;
        'aria-colindex'?: number;
        'aria-colspan'?: number;
        'aria-controls'?: string;
        'aria-current'?: boolean | "time" | "page" | "false" | "true" | "step" | "location" | "date";
        'aria-describedby'?: string;
        'aria-details'?: string;
        'aria-disabled'?: boolean | "false" | "true";
        'aria-dropeffect'?: "link" | "none" | "copy" | "move" | "execute" | "popup";
        'aria-errormessage'?: string;
        'aria-expanded'?: boolean | "false" | "true";
        'aria-flowto'?: string;
        'aria-grabbed'?: boolean | "false" | "true";
        'aria-haspopup'?: boolean | "dialog" | "menu" | "listbox" | "grid" | "false" | "true" | "tree";
        'aria-hidden'?: boolean | "false" | "true";
        'aria-invalid'?: boolean | "false" | "true" | "grammar" | "spelling";
        'aria-keyshortcuts'?: string;
        'aria-label'?: string;
        'aria-labelledby'?: string;
        'aria-level'?: number;
        'aria-live'?: "off" | "assertive" | "polite";
        'aria-modal'?: boolean | "false" | "true";
        'aria-multiline'?: boolean | "false" | "true";
        'aria-multiselectable'?: boolean | "false" | "true";
        'aria-orientation'?: "horizontal" | "vertical";
        'aria-owns'?: string;
        'aria-placeholder'?: string;
        'aria-posinset'?: number;
        'aria-pressed'?: boolean | "mixed" | "false" | "true";
        'aria-readonly'?: boolean | "false" | "true";
        'aria-relevant'?: "all" | "text" | "additions" | "additions removals" | "additions text" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals";
        'aria-required'?: boolean | "false" | "true";
        'aria-roledescription'?: string;
        'aria-rowcount'?: number;
        'aria-rowindex'?: number;
        'aria-rowspan'?: number;
        'aria-selected'?: boolean | "false" | "true";
        'aria-setsize'?: number;
        'aria-sort'?: "none" | "ascending" | "descending" | "other";
        'aria-valuemax'?: number;
        'aria-valuemin'?: number;
        'aria-valuenow'?: number;
        'aria-valuetext'?: string;
        children?: React.ReactNode;
        dangerouslySetInnerHTML?: {
            __html: string;
        };
        onCopy?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCopyCapture?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCut?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCutCapture?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onPaste?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onPasteCapture?: (event: React.ClipboardEvent<HTMLElement>) => void;
        onCompositionEnd?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionEndCapture?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionStart?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionStartCapture?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionUpdate?: (event: React.CompositionEvent<HTMLElement>) => void;
        onCompositionUpdateCapture?: (event: React.CompositionEvent<HTMLElement>) => void;
        onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
        onFocusCapture?: (event: React.FocusEvent<HTMLElement>) => void;
        onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
        onBlurCapture?: (event: React.FocusEvent<HTMLElement>) => void;
        onChange?: (event: React.FormEvent<HTMLElement>) => void;
        onChangeCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onBeforeInput?: (event: React.FormEvent<HTMLElement>) => void;
        onBeforeInputCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onInput?: (event: React.FormEvent<HTMLElement>) => void;
        onInputCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onReset?: (event: React.FormEvent<HTMLElement>) => void;
        onResetCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onSubmit?: (event: React.FormEvent<HTMLElement>) => void;
        onSubmitCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onInvalid?: (event: React.FormEvent<HTMLElement>) => void;
        onInvalidCapture?: (event: React.FormEvent<HTMLElement>) => void;
        onLoad?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onError?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onErrorCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyDownCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyPressCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onKeyUpCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
        onAbort?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onAbortCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlay?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlayCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlayThrough?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onCanPlayThroughCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onDurationChange?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onDurationChangeCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEmptied?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEmptiedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEncrypted?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEncryptedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEnded?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onEndedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedData?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedDataCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedMetadata?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadedMetadataCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadStart?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onLoadStartCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPause?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPauseCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlay?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlayCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlaying?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onPlayingCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onProgress?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onProgressCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onRateChange?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onRateChangeCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeeked?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeekedCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeeking?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSeekingCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onStalled?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onStalledCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSuspend?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSuspendCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onTimeUpdate?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onTimeUpdateCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onVolumeChange?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onVolumeChangeCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onWaiting?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onWaitingCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onAuxClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onAuxClickCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onClickCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onContextMenu?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onContextMenuCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onDoubleClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onDoubleClickCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onDrag?: (event: React.DragEvent<HTMLElement>) => void;
        onDragCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEnd?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEndCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEnter?: (event: React.DragEvent<HTMLElement>) => void;
        onDragEnterCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragExit?: (event: React.DragEvent<HTMLElement>) => void;
        onDragExitCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragLeave?: (event: React.DragEvent<HTMLElement>) => void;
        onDragLeaveCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragOver?: (event: React.DragEvent<HTMLElement>) => void;
        onDragOverCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDragStart?: (event: React.DragEvent<HTMLElement>) => void;
        onDragStartCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onDrop?: (event: React.DragEvent<HTMLElement>) => void;
        onDropCapture?: (event: React.DragEvent<HTMLElement>) => void;
        onMouseDown?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseDownCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseMove?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseMoveCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOut?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOutCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOver?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseOverCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseUp?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onMouseUpCapture?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onSelect?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onSelectCapture?: (event: React.SyntheticEvent<HTMLElement, Event>) => void;
        onTouchCancel?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchCancelCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchEndCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchMoveCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
        onTouchStartCapture?: (event: React.TouchEvent<HTMLElement>) => void;
        onPointerDown?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerDownCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerMove?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerMoveCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerUp?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerUpCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerCancel?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerCancelCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerEnter?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerEnterCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerLeave?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerLeaveCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOver?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOverCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOut?: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerOutCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onGotPointerCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onGotPointerCaptureCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onLostPointerCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onLostPointerCaptureCapture?: (event: React.PointerEvent<HTMLElement>) => void;
        onScroll?: (event: React.UIEvent<HTMLElement, UIEvent>) => void;
        onScrollCapture?: (event: React.UIEvent<HTMLElement, UIEvent>) => void;
        onWheel?: (event: React.WheelEvent<HTMLElement>) => void;
        onWheelCapture?: (event: React.WheelEvent<HTMLElement>) => void;
        onAnimationStart?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationStartCapture?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationEnd?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationEndCapture?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationIteration?: (event: React.AnimationEvent<HTMLElement>) => void;
        onAnimationIterationCapture?: (event: React.AnimationEvent<HTMLElement>) => void;
        onTransitionEnd?: (event: React.TransitionEvent<HTMLElement>) => void;
        onTransitionEndCapture?: (event: React.TransitionEvent<HTMLElement>) => void;
    };
};

//# sourceMappingURL=types.d.ts.map
