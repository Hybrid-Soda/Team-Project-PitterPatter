using UnityEngine;

public class PlayerTrigger : MonoBehaviour
{
    private GameScene gameScene;

    void Awake()
    {
        gameScene = FindObjectOfType<GameScene>();
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!gameScene.colliders.Contains(other.gameObject))
        {    
            if (gameScene.round == 1)
            {
                // 오브젝트가 아직 목록에 없고 태그가 동일한 경우 목록에 추가
                if (gameObject.CompareTag(other.gameObject.tag))
                    gameScene.colliders.Add(other.gameObject);
            }
            else if (gameScene.round == 2)
            {
                // 오브젝트가 아직 목록에 없는 경우 목록에 추가
                gameScene.colliders.Add(other.gameObject);
            }
        }
    }

    private void OnTriggerExit(Collider other)
    {
        // 오브젝트를 목록에서 제거
        gameScene.colliders.Remove(other.gameObject);
    }
}
