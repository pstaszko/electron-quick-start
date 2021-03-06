var story = window.GlobalStory;
story.Init = function () {
    story.Name = "Dick and Jane Need Water";
    story.Characters["Dick"] = new Character("Dick");
    story.Characters["jane"] = new Character("Jane");
    story.Characters["thug"] = new Character("Thug");
    var scStart = story.AddScene(Scene.CreateScene("1) Dick and Jane ran out of water and decide to walk to the well. Dick suggests a long, boring route. Jane knows a shortcut."));
    var scLongRoute = story.AddScene(Scene.CreateScene("2) Dick and Jane take the long route to the store. Along the way they fight visciously about politics."));
    var scShortcut = story.AddScene(Scene.CreateScene("3) Jane drags Dick through a maze of alleyways. On the ground, they come find a rubber chicken and a loaded hand gun."));
    var scOgre = story.AddScene(Scene.CreateFunctionScene(function () {
        var result = "4) An ogre jumps out in front of Dick and Jane.";
        if (story.Characters["Dick"].Items.indexOf("sword") >= 0) {
            result += " Without a second though, Dick plunges his +1 sword of ogre slaying into the beasts heart. The End.";
        }
        else if (story.Characters["Dick"].Items.indexOf("jesterhat") >= 0) {
            result += " Thinking fast, Dick pulls on the jester's hat. The ogre makes him dance about before eating him. The End.";
        }
        else {
            result += " The ogre took pitty on the boring, unarmed fools. He let them go. The End.";
        }
        return result;
    }));
    var scWell = story.AddScene(Scene.CreateFunctionScene(function () {
        if (story.SceneHistory.indexOf(scOgre) >= 0) {
            return "5) Dick and Jane fetched their water from the well. Oh what an adventure. The End";
        }
        else {
            return "6) Dick and Jane fetched their water from the well. What a boring story. The End";
        }
    }));
    scStart.AddOption(StoryOption.Create("Take the long, boring route.", scLongRoute));
    scStart.AddOption(StoryOption.Create("Take the shortcut.", scShortcut));
    scLongRoute.AddOption(StoryOption.Create("Continue", scWell));
    scShortcut.AddOption(StoryOption.Create("Dick picks up the rubber chicken", scOgre, function () { story.Characters["Dick"].Items.push("jesterhat"); }));
    scShortcut.AddOption(StoryOption.Create("Dick picks up the gun", scOgre, function () { story.Characters["Dick"].Items.push("gun"); }));
    scShortcut.AddOption(StoryOption.Create("Continue walking", scOgre));
};
story.Start();
//# sourceMappingURL=DickAndJane.js.map