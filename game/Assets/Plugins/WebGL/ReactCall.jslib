mergeInto(LibraryManager.library, {
  GoToUnity: function () {
    try {
          window.dispatchReactUnityEvent("GoToUnity");
    } catch (e) {
      console.warn("Failed to dispatch event");
    }
  },
});