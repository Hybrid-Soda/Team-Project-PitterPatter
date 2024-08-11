using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class DifficultyScene : BaseScene
{
    // 버튼 이름을 숫자로 파싱하여 난이도 설정
    public void SetDifficulty(Button button)
    {
        if (int.TryParse(button.name, out int diffLevel))
        {
            Managers.Play.DiffLevel = diffLevel;
            Managers.Scene.LoadScene(Define.Scene.GameScene);
        }
    }
}
