using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ResourceManager
{
    // 리소스를 캐싱하기 위한 딕셔너리. 키는 리소스 이름(문자열)이고 값은 로드된 GameObject
    Dictionary<string, GameObject> resource = new Dictionary<string, GameObject>();

    // [제네릭 메서드] 주어진 경로에서 리소스를 로드, T는 메서드가 호출될 때 구체적인 타입으로 대체
    public T Load<T>(string path) where T : Object
    {
        if(typeof(T) == typeof(GameObject))
        {
            string name = path;
            int index = name.LastIndexOf('/');

            if (index >= 0) name = name.Substring(index + 1);

            // 딕셔너리에 있으면, 캐싱된 GameObject를 반환
            if (resource.ContainsKey(name))
            {
                GameObject gameObject = resource[name];
                
                if (gameObject != null)
                    return gameObject as T;
            }
            // 딕셔너리에 없으면 Resources.Load를 사용하여 로드하고, 딕셔너리에 추가
            else
            {
                GameObject gameObject = Resources.Load<GameObject>(path);
                if (gameObject != null)
                {
                    resource[name] = gameObject;
                    return gameObject as T;
                }
            }
        }

        return Resources.Load<T>(path);
    }
}

