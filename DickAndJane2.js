var story = window.GlobalStory;
story.Init = function () {
    story.Name = "Dick and Jane Need Water";
    story.Characters["Dick"] = new Character("Dick");
    story.Characters["jane"] = new Character("Jane");
    story.Characters["thug"] = new Character("Thug");
    var scStart = story.AddScene(Scene.CreateScene("Dick and Jane ran out of water and decide to walk to the well. Dick suggests a long, boring route. Jane knows a shortcut."));
    var scLongRoute = story.AddScene(Scene.CreateScene("Dick and Jane take the long route to the well. Along the way they fight visciously about the politics of the kingdom."));
    var scShortcut = story.AddScene(Scene.CreateScene("Jane drags Dick through a gnarled forest path. On the ground, they come find a jester's hat and a sword."));
    var scOgre = story.AddScene(Scene.CreateFunctionScene(function () {
        var result = "An ogre jumps out in front of Dick and Jane.";
        if (story.Characters["Dick"].Items.indexOf("sword") >= 0) {
            result += " Without a second though, Dick plunges his +1 sword of ogre slaying into the beasts heart. The End.";
        }
        else if (story.Characters["Dick"].Items.indexOf("jesterhat") >= 0) {
            result += " Thinking fast, Dick pulls on the jester's hat. The ogre makes him dance about before eating him. The End.";
        }
        else {
            result += " The ogre takes pitty on the boring, unarmed fools. He lets them go. The End.";
        }
        return result;
    }));
    var scWell = story.AddScene(Scene.CreateFunctionScene(function () {
        if (story.SceneHistory.indexOf(scOgre) >= 0) {
            return "Dick and Jane fetched their water from the well. Oh what an adventure. The End";
        }
        else {
            return "Dick and Jane fetched their water from the well. What a boring story. The End";
        }
    }));
    scStart.AddOption(StoryOption.Create("Take the long, boring route.", scLongRoute));
    scStart.AddOption(StoryOption.Create("Take the shortcut.", scShortcut));
    scLongRoute.AddOption(StoryOption.Create("Continue", scWell));
    scShortcut.AddOption(StoryOption.Create("Dick picks up the jester's hat", scOgre, function () { story.Characters["Dick"].Items.push("jesterhat"); }));
    scShortcut.AddOption(StoryOption.Create("Dick picks up the sword", scOgre, function () { story.Characters["Dick"].Items.push("sword"); }));
    scShortcut.AddOption(StoryOption.Create("Continue walking", scOgre));
};
story.Start();
//# sourceMappingURL=DickAndJane2.js.map