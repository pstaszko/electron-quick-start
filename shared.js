var Story = (function () {
    function Story() {
        this.Characters = {};
        this.Scenes = new Array();
        this.SceneHistory = new Array();
    }
    Story.prototype.Init = function () {
    };
    Story.prototype.Reset = function () {
        this.Start();
        return false;
    };
    Story.prototype.AddScene = function (scene) {
        this.Scenes.push(scene);
        return scene;
    };
    Story.prototype.Start = function () {
        this.Init();
        this.ActiveScene = ko.observable(this.Scenes[0]);
    };
    return Story;
}());
var StoryOption = (function () {
    function StoryOption() {
    }
    StoryOption.prototype.SelectAction = function () {
    };
    StoryOption.Create = function (description, nextScene, Action) {
        if (Action === void 0) { Action = null; }
        var so = new StoryOption();
        so.Description = description;
        so.NextScene = nextScene;
        if (Action != null) {
            so.SelectAction = Action;
        }
        return so;
    };
    StoryOption.prototype.Select = function () {
        this.SelectAction();
        window.GlobalStory.ActiveScene(this.NextScene);
        window.GlobalStory.SceneHistory.push(this.NextScene);
        return false;
    };
    return StoryOption;
}());
var Scene = (function () {
    function Scene() {
        this.Options = ko.observableArray(new Array());
    }
    Scene.CreateScene = function (description) {
        var s = new Scene();
        s.Description = description;
        return s;
    };
    Scene.CreateFunctionScene = function (DescriptionDelegate) {
        var s = new Scene();
        s.DescriptionDelegate = DescriptionDelegate;
        return s;
    };
    Scene.prototype.GetDescription = function () {
        if (this.DescriptionDelegate == null) {
            return this.Description;
        }
        else {
            return this.DescriptionDelegate();
        }
    };
    Scene.prototype.AddOption = function (option) {
        this.Options().push(option);
    };
    Scene.prototype.Display = function () {
    };
    Scene.prototype.RenderOptions = function () {
    };
    return Scene;
}());
var Character = (function () {
    function Character(name) {
        this.name = name;
        this.Items = new Array();
    }
    return Character;
}());
window.GlobalStory = new Story();
//# sourceMappingURL=shared.js.map