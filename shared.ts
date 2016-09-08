interface Window {
    GlobalStory: Story;
}
interface HashTable<T> {
    [key: string]: T;
}
class Story {
    Name: string;
    Scenes: Array<Scene>;
    //CreateScene(Description: string) {
    //    var scene = new Scene(Description);
    //    this.Scenes.push(scene);
    //    return scene;
    //}
    constructor() {
        this.Scenes = new Array<Scene>();
        this.SceneHistory = new Array<Scene>();
    }
    Init() {
    }
    Reset() {
        this.Start();
        return false;
    }
    AddScene(scene: Scene): Scene {
        this.Scenes.push(scene);
        return scene;
    }
    SceneHistory: Array<Scene>;
    Characters: HashTable<Character> = {};
    Start() {
        this.Init();
        this.ActiveScene = ko.observable(this.Scenes[0]);
    }
    ActiveScene: KnockoutObservable<Scene>;
}
class StoryOption {
    Description: string;
    SelectAction() {
        //"Override this";
    }
    NextScene: Scene;
    public static Create(description: string, nextScene: Scene, Action: () => void = null): StoryOption {
        let so = new StoryOption();
        so.Description = description;
        so.NextScene = nextScene
        if (Action != null) {
            so.SelectAction = Action;
        }
        return so;
    }
    Select() {
        this.SelectAction();
        window.GlobalStory.ActiveScene(this.NextScene);
        window.GlobalStory.SceneHistory.push(this.NextScene);
        return false;
    }
}
class Scene {
    public static CreateScene(description: string) {
        let s = new Scene();
        s.Description = description;
        return s;
    }
    public static CreateFunctionScene(DescriptionDelegate: () => string) {
        let s = new Scene();
        s.DescriptionDelegate = DescriptionDelegate;
        return s;
    }
    constructor() {
        this.Options = ko.observableArray(new Array<StoryOption>());
    }
    private DescriptionDelegate: () => string;
    private Description: string;
    GetDescription(): string {
        if (this.DescriptionDelegate == null) {
            return this.Description;
        } else {
            return this.DescriptionDelegate();
        }
    }
    Options: KnockoutObservableArray<StoryOption>;
    AddOption(option: StoryOption) {
        this.Options().push(option);
    }
    Display() {
    }
    RenderOptions() {
    }
}
class Character {
    constructor(public name: string) { }
    Items: Array<string> = new Array<string>();
}
window.GlobalStory = new Story();
