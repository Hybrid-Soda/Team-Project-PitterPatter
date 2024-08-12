using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class MapManager : MonoBehaviour
{
    // 맵 매니저 초기화
    public void Init()
    {
        SetMap((Define.Map)Managers.Network.mapNum - 1);
    }

    // 전달된 Define.Map 타입의 맵을 로드하고 설정
    private void SetMap(Define.Map map)
    {
        // 로드된 맵 프리팹을 현재 위치에 회전값과 함께 인스턴스화
        GameObject mapPrefab = Managers.Resource.Load<GameObject>($"Maps/{map}");
        Instantiate(mapPrefab, Vector3.zero, mapPrefab.transform.rotation);
    }
}
