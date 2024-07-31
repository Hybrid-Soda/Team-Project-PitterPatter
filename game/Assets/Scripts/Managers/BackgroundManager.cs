using UnityEngine;

public class BackgroundManager : MonoBehaviour
{
    public GameObject[] backgroundPrefabs;
    private int backgroundNum;

    private void Awake()
    {
        backgroundNum = GameManager.Instance.backgroundNum;
        SetBackground(backgroundNum);
    }

    public void SetBackground(int mapNum)
    {
        if (backgroundPrefabs.Length == 0) return;

        GameObject backgroundPrefab = backgroundPrefabs[mapNum];

        if (backgroundPrefab != null)
        {
            Instantiate(backgroundPrefab, Vector3.zero, backgroundPrefab.transform.rotation);
        }
    }
}
