mergeInto(LibraryManager.library, {
  UnityToReact: function (score, isGameEnd) {
    window.dispatchReactUnityEvent("UnityToReact", score, Boolean(isGameEnd));
  },
});