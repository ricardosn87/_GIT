<template>
   <div class="admin-pages">
    <PageTtile icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro & Cia"></PageTtile>

    <div class="admin-pages-tabs">
       <b-card no-body>
           <b-tabs card>
              <b-tab title="Artigos" active>
                 <ArticleAdmin/>
              </b-tab>
              <b-tab title="Categorias" active>
                 <CategoryAdmin></CategoryAdmin>
              </b-tab>
               <b-tab title="Usuários" active>
                 <UserAdmin></UserAdmin>
              </b-tab>
           </b-tabs>
       </b-card>
    </div>
   </div>
</template>

<script>
import PageTtile from '../template/PageTitle.vue';
import ArticleAdmin from './ArticleAdmin.vue';
import CategoryAdmin from './CategoryAdmin.vue';
import UserAdmin from './UserAdmin.vue';

export default {
    name: "AdmimPages",
    components: { PageTtile, ArticleAdmin, CategoryAdmin, UserAdmin }
}
</script>

<style>

</style>