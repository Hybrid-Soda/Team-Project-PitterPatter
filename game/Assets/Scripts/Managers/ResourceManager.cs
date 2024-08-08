using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ResourceManager
{
    Dictionary<string, GameObject> resource = new Dictionary<string, GameObject>();

    public T Load<T>(string path) where T : Object
    {
        if(typeof(T) == typeof(GameObject))
        {
            string name = path;
            int index = name.LastIndexOf('/');
            if (index >= 0) name = name.Substring(index + 1);

            GameObject gameObject = resource[name];
            if (gameObject != null) return gameObject as T;
        }
        return Resources.Load<T>(path);
    }
}
