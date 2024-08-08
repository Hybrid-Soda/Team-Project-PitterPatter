using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapManager : MonoBehaviour
{
    public GameObject[] mapPrefabs;
    private int mapNum;

    public void Awake()
    {
        mapNum = Managers.Network.mapNum;
        SetBackground(mapNum);
    }

    private void SetBackground(int mapNum)
    {
        if (mapPrefabs.Length == 0) return;

        GameObject mapPrefab = GetBackground($"{mapNum}");
        Debug.Log(mapPrefab);

        if (mapPrefab != null)
        {
            Instantiate(mapPrefab, Vector3.zero, mapPrefab.transform.rotation);
        }
    }

    GameObject GetBackground(string path)
    {
        if (path.Contains("Maps/") == false) path = $"Maps/Map{path}";

        GameObject mapPrefab = null;
        mapPrefab = Managers.Resource.Load<GameObject>(path);


        if (mapPrefab == null)
            Debug.Log($"Map Missing {path}");

        return mapPrefab;
    }
}
