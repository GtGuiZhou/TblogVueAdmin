import { AddApi } from '../../api/page.crud.example'

export default {
  crudLoading: false,
  methods: {
    onAdd(){
      AddApi()
    }
  }
}