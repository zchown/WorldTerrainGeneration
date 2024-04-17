##### NOTES

### Structure
    # AppOne.ts
        * Loads the scene from scene-creation.ts
    # scene-creation.ts
        * Most Babylon code goes here camera light stuff etc
    # materials.ts
        * This is where shaders are combined into materials
        * currently a list of factory functions
            * Would be nice to make this modular allowing specification of any vertex and fragment shader
            * This would require embedding shaders inside an object that keps track of what attributes uniforms and samplers they need
            * also requires vertex fragment compatibility with things like varying
    # shaders.ts
        * all shader code goes here
        * vertex shaders go in the VertexModule
        * fragment shaders go in the FragmentModule
    #Height Map/textures etc
        * all should be placed in public/assets
        * loaded with ./assets/(name of asset)

### Current Progress
    # standard vertex and fragment shaders for debugging purposes
    # height map vertex shader that deforms ground based on a height map
    # various shaders for coloring to be able to see height map clearly
    $ Skybox created


### TODO
    # Load grass/tree/snow/rock textures
        * application of textures should be based on height and slope of terrain being applied to
        * height is easy as we can use varying position
        * How to do slope? Something to do with normals?
    # Thickness
        * Not sure if current shaders will work if applied to like a box?
        * how do we create a world thats thick
            * maybe vertex shade the top face differently then the rest?
    # Create our own height maps
        * perlain noise?
        * other options to generate these as well
    # Instead of using flat textures apply a more PBR style texture
        * No idea how to do this?

### Super Optional (If we have time to kill)
    # Water with reflections and distortions filling lower part of world
        * With transparency could add fish
        * boat?
    # Flying birds?
    # Rain?
