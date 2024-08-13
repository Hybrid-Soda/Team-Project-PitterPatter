mergeInto(LibraryManager.library, {
  UnityToReact: function (score, isGameEnd, isLoading) {
    window.dispatchReactUnityEvent("UnityToReact", score, isGameEnd, isLoading);
  },
});