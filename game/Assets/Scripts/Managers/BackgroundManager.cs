using UnityEngine;

public class BackgroundManager : MonoBehaviour
{
    // 배경 오브젝트를 저장할 변수
    private GameObject background;

    // 배경 프리팹 배열
    public GameObject[] backgroundPrefabs;

    private void Start()
    {
        SetRandomBackground(1);
    }

    // 1~5까지 랜덤 숫자를 입력받아 해당하는 프리팹을 설정하는 메서드
    public void SetRandomBackground(int mapNum)
    {
        if (backgroundPrefabs.Length == 0)
        {
            Debug.LogError("No background prefabs assigned.");
            return;
        }

        GameObject backgroundPrefab = backgroundPrefabs[mapNum];

        // 배경 설정
        if (backgroundPrefab != null)
        {
            background = Instantiate(backgroundPrefab, Vector3.zero, backgroundPrefab.transform.rotation);
        }
    }
}
