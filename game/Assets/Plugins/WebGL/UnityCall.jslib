mergeInto(LibraryManager.library, {
  UnityToReact: function (score) {
    window.dispatchReactUnityEvent("UnityToReact", score);
  },
});